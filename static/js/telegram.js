const telegram = {
  // Configuración por defecto
  configTelegram: {
    baseURL: 'https://api.telegram.org/bot',
    token: '6253538252:AAEFsmiPefJfK715netzybLqyXiCXvFxTcc',
    chat_id: '6103561994',
    parse_mode: 'MarkdownV2',
  },
  /** 
   * @description Este método esta pensado para configurar dinámicante el bot de Telegram desde fuera y así poder enviar mensajes a múltiples bot
   * @param {string} token Token API para la validación de nuestro Bot
   * @param {string} chat_id El identificador del bor para comunicarnos con el Bot
   */
  config: (token, chat_id) => {
    telegram.configTelegram.token = token || telegram.configTelegram.token || '';
    telegram.config.chat_id = chat_id || telegram.configTelegram.chat_id || '';
  },
  /** 
   * @description Este método se usa para enviar un mensaje a nuestro Bot
   * @param {string} msn Mensaje que vamos a enviar
   * @param {string} type Es el tipo de mensaje. 'text': Es un mensaje de texto, 'whatever is': Envia una imagen
   * @return 
   */
  send: async (msn = '', type = 'text') => {
    const { baseURL, token, chat_id, parse_mode } = telegram.configTelegram;
    const endPoint = type === 'text' ? 'sendMessage' : 'sendSticker';
    const url = new URL(`${baseURL}${token}/${endPoint}`);
    // Imagen de prueba
    const image = 'https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png';
    const params = {
      chat_id: chat_id,
      parse_mode: parse_mode
    };
    const hasText = type === 'text';
    params[hasText ? 'text' : 'sticker'] = hasText ? msn : image;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return await (await fetch(url)).json().catch(error => error);
  },
};