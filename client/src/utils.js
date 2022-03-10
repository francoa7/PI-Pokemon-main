module.exports = {
    capitalizeString: function (string) {
        const capString = string.charAt(0).toUpperCase() + string.slice(1);
        return capString;
    },
};
