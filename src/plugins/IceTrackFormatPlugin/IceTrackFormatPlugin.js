(function() {

var exports = this;

/**
 * When active, this plugin will convert two successively typed dashes, within
 * the ice block element, into an emdash. 
 */
var IceTrackFormatPlugin = function(ice_instance) {
	this._ice = ice_instance;
	this._ins_node = '';
	this._del_node = '';
	
};

IceTrackFormatPlugin.prototype = {
  handleFormatting1 : function(type) {
    
    
    //this._ice.insert(range.toHtml(), range);
    
    var range = this._ice.getCurrentRange();
    //range.extractContents();
	range.collapse();
    var obj = this._ice.env.document.createTextNode(range.toHtml());
    if (this._ice.isTracking) {
		this._ice._insertNode(obj, range);
		this._ice.editorObj.execCommand('Bold');
	} else {
		range.insertNode(obj);
		range.setStart(obj, 1);
		
		range.collapse(true);
	}
    
    
    
  },
  handleFormatting : function(type) {
    if (this._ice.isTracking) {
        var range = this._ice.getCurrentRange();

        //var div = document.createElement("div");
        //div.innerHTML = range.toHtml();
        //var innerText = div.textContent || div.innerText || "";
        
        //var obj = this._ice.env.document.createTextNode('_' + range.toHtml());
        var selected_html = range.toHtml();
        var obj = this._ice.env.document.createTextNode(range.toHtml());
            //console.log(obj);
            
        this._ice.insert(obj, range);
            
        range.collapse();
            
        range.setStart(obj, 0);
        
        
        this._ice.editorObj.execCommand('Bold');
     }   
     
  },
  
  rejectChange: function (node) {
    if (this._ice.isTracking) {
        var data_cid = jQuery(node).attr('data-cid');
        data_cid--;
        
        var text = jQuery(this._ice.env.document).find('span[data-cid='+ data_cid +']').html();
        
        //jQuery(this._ice.env.document).find('[data-cid="4"]').replaceWith(text);
        var f = jQuery(this._ice.env.document).find('[data-cid="'+ data_cid +'"]').get(0);
        var t = this._ice.env.document.createTextNode(text);
        f.parentNode.replaceChild(t, f);
        
        //this._ice.editorObj.dom.removeTag(this._ice.editorObj.getBody(), '[data-cid="'+ data_cid +'"]');
     }   
  },
  acceptChange: function (node) {
    if (this._ice.isTracking) {
        var data_cid = jQuery(node).attr('data-cid');
        data_cid--;
        
        jQuery(this._ice.env.document).find('span[data-cid='+ data_cid +']').remove();
        
     }   
  }
  
  
};

ice.dom.noInclusionInherits(IceTrackFormatPlugin, ice.IcePlugin);
exports._plugin.IceTrackFormatPlugin = IceTrackFormatPlugin;

}).call(this.ice);

function strstr(haystack, needle, bool) {
  //  discuss at: http://phpjs.org/functions/strstr/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: strstr('Kevin van Zonneveld', 'van');
  //   returns 1: 'van Zonneveld'
  //   example 2: strstr('Kevin van Zonneveld', 'van', true);
  //   returns 2: 'Kevin '
  //   example 3: strstr('name@example.com', '@');
  //   returns 3: '@example.com'
  //   example 4: strstr('name@example.com', '@', true);
  //   returns 4: 'name'

  var pos = 0;

  haystack += '';
  pos = haystack.indexOf(needle);
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos + needle.length);
    }
  }
}
