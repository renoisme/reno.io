let output = document.getElementById('output');
let deleteAllButton = document.getElementById('delete_all');

let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

savedImages.forEach(savedImage => {
    let div = createImageContainer(savedImage.src, savedImage.name, savedImage.type);
    output.appendChild(div);
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.type.startsWith('image/')) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let div = createImageContainer(e.target.result, file.name, file.type);
                output.appendChild(div);

                savedImages.push({ src: e.target.result, name: file.name, type: file.type });
                localStorage.setItem('savedImages', JSON.stringify(savedImages));
            };
            reader.readAsDataURL(file);
        }
    }
}

deleteAllButton.onclick = function () {
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    savedImages = [];
    localStorage.removeItem('savedImages');
};

function createImageContainer(src, name, type) {
    let div = document.createElement('div');
    div.className = 'image-container';
    let img = document.createElement('img');
    img.src = src;
    let p = document.createElement('p');
    p.textContent = name + ' (' + type + ')';
    let button = document.createElement('button');
    button.textContent = '削除';
    button.onclick = function () {
        output.removeChild(div);

        savedImages = savedImages.filter(savedImage => savedImage.src !== src);
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
    };
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    return div;
}
