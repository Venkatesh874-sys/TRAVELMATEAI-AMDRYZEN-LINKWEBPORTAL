/* ============================================================
   TRAVELMATE AI — AI API UTILITY
   js/utils/api.js
   ============================================================ */

const API = (() => {

  /**
   * Call Anthropic Claude API with streaming support.
   * @param {string} prompt - The user prompt
   * @param {function} onChunk - Called with the accumulated text as it streams
   * @param {string} systemPrompt - Optional system prompt
   * @returns {Promise<string>} - Final full text
   */
  async function callClaude(prompt, onChunk = null, systemPrompt = '') {
    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    };

    if (systemPrompt) {
      body.system = systemPrompt;
    }

    let response;
    try {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (err) {
      throw new Error('Network error — check your connection.');
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API error ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

      for (const line of lines) {
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const data = JSON.parse(jsonStr);
          if (data.type === 'content_block_delta' && data.delta?.text) {
            fullText += data.delta.text;
            if (typeof onChunk === 'function') onChunk(fullText);
          }
        } catch (_) {
          // skip malformed SSE lines
        }
      }
    }

    return fullText;
  }

  return { callClaude };
})();
