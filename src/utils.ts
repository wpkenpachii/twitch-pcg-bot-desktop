export function removeWordsAccents(text: string) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gmi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gmi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gmi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gmi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gmi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gmi'), 'c');
    return text;
}