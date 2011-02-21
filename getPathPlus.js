/*
 * jQuery getPathPlus
 * v 0.1 - 02/21/2011
 *
 * Author: Koesmanto Bong - http://web.koesbong.com
 * Licensed under MIT license - http://www.opensource.org/licenses/mit-license.php
 *
 * Purpose:
 * This plugin will traverse up the DOM tree starting from
 * the selected element until it finds the closest element with
 * an ID and returns the selector in a string format.
 *
 * Example Usage:
 * >> HTML
 * <div id="main">
 *     <span class="inner">
 *          <p>text</p>
 *     </span>
 * </div>
 *
 * >> $('p').getPathPlus();
 *    "#main span.inner p"
 *
 * >> $('p').getPathPlus(' > ');
 *    "#main > span.inner > p"
*/

(function($){
    jQuery.fn.getPathPlus = function (separator) {
        var path,
            node = this;

        if (this.length != 1) {
            throw 'Requires one element.';
        }

        while (node.length) {
            var realNode = node[0],
                name = realNode.localName,
                parent = node.parent(),
                siblings = parent.children(name),
                strippedNode;
                
            if (!name) {
                break;
            }

            name = name.toLowerCase();
            separator = (!separator) ? ' ' : separator;
            
            if (realNode.id) {
                // As soon as an element with an ID is found, stop searching
                return '#' + realNode.id + (path ? (separator + path) : '');
            } else if (realNode.className) {
                strippedNode = $.trim(realNode.className);
                name += '.' + strippedNode.split(/\s+/).join('.');
            }

            /* In case there are more than one of the same element,
             * specify using :eq(n) property.
             */
            if (siblings.length > 1) {
                name += ':eq(' + siblings.index(node) + ')';
            }
            
            path = name + (path ? (separator + path) : '');

            node = parent;
        }

        return path;
    };
})(jQuery);
