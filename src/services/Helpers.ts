export const decodeHtml = (html: string) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

export const arrayShuffle = (items: any[]) => {
    const length = items.length;
    for (let i = 0; i < items.length; i++) {
        const randomIdx = Math.floor(Math.random() * (length - 1));
        const temp = items[i];
        items[i] = items[randomIdx];
        items[randomIdx] = temp;
    }

    return items;
};
