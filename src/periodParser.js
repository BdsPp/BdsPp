module.exports = function(input) {
    if (!isNaN(input))
        return Number(input);
    var output = 0;
    var temp1 = "";
    for (var i = 0; i < input.length; i++) {
        switch (input[i].toLowerCase()) {
            case 'd':
                output += (((1000 * 60) * 60) * 24) * Number(temp1);
                temp1 = "";
                break;
            case 'h':
                output += ((1000 * 60) * 60) * Number(temp1);
                temp1 = "";
                break;
            case 'm':
                output += (1000 * 60) * Number(temp1);
                temp1 = "";
                break;
            case 's':
                output += 1000 * Number(temp1);
                temp1 = "";
                break;
            case 'f':
                output += Number(temp1);
                temp1 = "";
                break;
            default:
                if (!isNaN(input[i]) || input == ".")
                    temp1 += input[i];
                break;
        }
    }
    return output;
}