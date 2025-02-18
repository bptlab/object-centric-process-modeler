import {some} from 'min-dash';

import {is} from '../../../util/Util';


/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<String>} types
 *
 * @return {Boolean}
 */
export function isAny(element, types) {
    return some(types, function (t) {
        return is(element, t);
    });
}


/**
 * Return the parent of the element with any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {String|Array<String>} anyType
 *
 * @return {djs.model.Base}
 */
export function getParent(element, anyType) {

    if (typeof anyType === 'string') {
        anyType = [anyType];
    }

    while ((element = element.parent)) {
        if (isAny(element, anyType)) {
            return element;
        }
    }

    return null;
}