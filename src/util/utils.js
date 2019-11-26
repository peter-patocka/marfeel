

export function debug(object) {
    console.debug(object);
}

export function log(object) {
    console.log(object)
}

export function error(message, object) {
    if(object) {
        console.error(message, object)
    } else {
        console.error(message)
    }
}

export function createElement(element, options) {
    return Object.assign(document.createElement(element), options);
}

export function stringFormat(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
        ? args[number] 
        : match
        ;
    });
}