let balloonIdNumber = 0;
window.onload = () => {
    pullBalloons();
    document.addEventListener('dblclick', handleDblClick);
};

const handleDblClick = (e) => {
    if (e.target.id === 'activeInput') {
        return;
    }
    if (e.target.classList.contains('balloon')) {
        editContent(e);
        return;
    }
    addElement(e);

    function addElement(e) {
        const BALLOON_HEIGHT_IN_PIXELS = 70;
        const TIP_DIST_IN_PIXELS = 30;
        let x, y;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        const pos = getAdjustedPosition(e.clientX - TIP_DIST_IN_PIXELS, e.clientY - BALLOON_HEIGHT_IN_PIXELS);
        x = pos.x;
        y = pos.y;
        // create a new div element
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        /* Preventing draggable */
        balloon.classList.add('active');
        balloon.id = 'b' + balloonIdNumber++;

        // add the text node to the newly created div
        balloon.appendChild(createTextInput());

        // add the newly created element and its content into the DOM
        const main = document.getElementById('main');
        main.appendChild(balloon);
        // set the element's new position:
        balloon.style.left = (x) + 'px';
        balloon.style.top = (y) + 'px';

        addListeners(balloon);
        dragElement(balloon);
    }

    function editContent(e) {
        let balloon = e.target;
        const text = balloon.innerHTML;
        let textInput = createTextInput();
        textInput.value = text;
        balloon.innerHTML = '';
        balloon.classList.add('active');
        balloon.appendChild(textInput);
        addListeners(balloon, text);
    }

    function createTextInput() {
        const textInput = document.createElement('input');
        textInput.id = 'activeInput';
        textInput.type = 'text';
        textInput.autofocus = true;
        return textInput;
    }
};

const dragElement = (element) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (element.classList.contains('active')) {
            return;
        }
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const x = element.offsetLeft - pos1;
        const y = element.offsetTop - pos2;
        const pos = getAdjustedPosition(x, y, element.clientWidth, element.clientHeight);
        // set the element's new position:
        element.style.left = (pos.x) + 'px';
        element.style.top = (pos.y) + 'px';
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        saveElement(element);
    }
};

const BALLOON_DEFAULT_WIDTH = 220;
const BALLOON_DEFAULT_HEIGHT = 70;

const getAdjustedPosition = (x, y, elementWidth = BALLOON_DEFAULT_WIDTH,
                             elementHeight = BALLOON_DEFAULT_HEIGHT) => {
    /* Balloon pointer height in pixels */
    const POINTER_HEIGHT = 15;
    const container = document.getElementById('main');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    elementHeight += POINTER_HEIGHT;
    let x1 = (x < 0) ? 0 : x;
    let y1 = (y < 0) ? 0 : y;
    x1 = (x + elementWidth > containerWidth) ? containerWidth - elementWidth : x1;
    y1 = (y + elementHeight > containerHeight) ? containerHeight - elementHeight : y1;
    return {'x': x1, 'y': y1};
};

const addListeners = (element, initialText = null) => {
    /* At removing div's content js fires blur, therefore event handler executes twice,
     * the second time with a warning.
     */
    let removed = false;
    element.addEventListener('keyup', handleEvent);
    element.addEventListener('focusout', handleEvent);

    function handleEvent(e) {
        if (removed) {
            return;
        }
        if (e.keyCode === 13 || e.keyCode === 27 || e.type === 'focusout') {
            removed = true;
            element.classList.remove('active');
        }
        if (e.keyCode === 13 || e.type === 'focusout') {
            if (!e.target.value) {
                saveElement(element, true);
                element.remove();
                return;
            }
            element.innerHTML = e.target.value;
            saveElement(element);
            return;
        }
        if (e.keyCode === 27) {
            if (initialText !== null) {
                element.innerHTML = initialText;
                return;
            }
            element.remove();
        }
    }
};

const pullBalloons = () => {
    $.post('index.php', 'pull', function (result) {
        result = JSON.parse(result);
        const main = document.getElementById('main');
        updateBalloonIdNumber(result);
        result.forEach(element => {
            main.appendChild(prepareElement(element))
        });
    });

    const prepareElement = (element) => {
        let balloon = document.createElement('div');
        const text = document.createTextNode(element.text);
        balloon.appendChild(text);
        balloon.id = element.id;
        balloon.style.left = element.left;
        balloon.style.top = element.top;
        balloon.classList.add('balloon');
        dragElement(balloon);
        return balloon;
    };

    const updateBalloonIdNumber = (elements) => {
        elements.forEach(element => {
            const elementId = parseInt(element.id.match(/\d+/));
            if (elementId >= balloonIdNumber) {
                balloonIdNumber = elementId + 1;
            }
        });
    }
};

const saveElement = (element, remove = false) => {
    const prepareData = (element) => {
        let data = {};
        data.id = element.id;
        data.left = element.style.left;
        data.top = element.style.top;
        if (remove) {
            data.text = '';
        } else {
            data.text = element.innerHTML;
        }
        return data;
    };
    const data = prepareData(element);
    $.post('index.php', data);
};
