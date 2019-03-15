var generateRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateXLabels = function () {
    var labels = [];
    for (let i = 0; i < 24; i++) {
        labels.push((i >= 10 ? i : '0' + i) + ':00');
    }
    return labels;
};

var generateData = function () {
    return [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2];
};

var generateColors = function (items) {
    var colors = [];

    items.forEach(item => {
        switch (item) {
            case 0:
            case 6:
                colors.push('#d38aff');
                break;
            case 1:
            case 5:
                colors.push('#ff838d');
                break;
            case 2:
                colors.push('#cccccc');
                break;
            case 3:
                colors.push('#fdda1e');
                break;
            case 4:
                colors.push('#ffb26f');
                break;
            default:
                colors.push('#cccccc');
                break;
        }
    });

    return colors;
}