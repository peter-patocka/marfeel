
export const utils = {
    debug: function(object) {
        console.debug(object);
    },
    log: function(object) {
        console.log(object)
    },
    error: function(message, object) {
        if(object)
            console.error(message, object)
        else
            console.error(message)
    },
    createElement: function(element, options) {
        return Object.assign(document.createElement(element), options);
    },
    stringFormat: function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number] 
            : match
          ;
        });
    }
}