/**
*** pagebreak - 1.0.0
*** https://github.com/nkchinh/pagebreak#readme
*** Copyright (c) 2017 Chinh Nguyen
*** License: MIT
**/
!(function(x, $){
	var pageBreak = function(ele){
		ele = ele || document.body;
		this.$ele = ele;
		this.$opt = {
			pageHeight: 500
		}
	};

	pageBreak.prototype = {
		pageHeight: function(height){
			if(arguments.length == 0){
				return this.$opt.pageHeight;
			}
			if(height != this.$opt.pageHeight){
				this.$_cache = null;
				this.$opt.pageHeight = height;
			}
			return this;
		},
		containers: function(conts){
			if(arguments.length == 0){
				return this.$opt.conts;
			}
			if(conts != this.$opt.conts){
				this.$_cache = null;
				this.$opt.conts = conts;
			}
			return this;
		},
		addContainer: function(element){
			if(!this.$opt.conts){
				this.$opt.conts = [];
			}
			this.$opt.conts.push(element);
		},
		each: function(callback){
			this.$_cache || calculate.call(this);
			for(var i = 0, l = this.$_cache.marks.length; i < l; i++){
				callback.call(this, i, this.$_cache.marks[i]);
			}
			return this;
		},
		insert: function(){
			this.$_cache || calculate.call(this);

			var ele;
			if(typeof arguments[0] === 'function'){
				for(var i = 0, l = this.$_cache.marks.length; i < l; i++){
					var mark = this.$_cache.marks[i];
					ele = arguments[0].call(this, i);
					if(mark.sibling){
						mark.container.insertBefore(ele, mark.sibling);
					}else{
						mark.container.appendChild(ele);
					}
				}
			}else if(typeof arguments[0] === 'string'){
				for(var i = 0, l = this.$_cache.marks.length; i < l; i++){
					var mark = this.$_cache.marks[i];
					var div = document.createElement('div');
					div.innerHTML = arguments[0];

					ele = div.firstChild;
					while(ele){
						var tmp = ele.nextSibling;

						div.removeChild(ele);

						if(mark.sibling){
							mark.container.insertBefore(ele, mark.sibling);
						}else{
							mark.container.appendChild(ele);
						}

						ele = tmp;
					}
				}
			}else{
				for(var i = 0, l = this.$_cache.marks.length; i < l; i++){
					var mark = this.$_cache.marks[i];

					var div = document.createElement('div');
					div.innerHTML = arguments[0].outerHTML;
					ele = div.firstChild;

					if(mark.sibling){
						mark.container.insertBefore(ele, mark.sibling);
					}else{
						mark.container.appendChild(ele);
					}
				}
			}

			return this;
		},
		insertPageBreak: function(){
			this.insert('<div style="page-break-after: always"></div>');

			return this;
		},
		count: function(){
			this.$_cache || calculate.call(this);
			return this.$_cache.marks.length + 1;
		}
	};

	var calculate = function(){
		this.$_cache = {
			marks: []
		};

		var cont = this.$ele;
		var containers = this.$opt.conts || [];
		var pageHeight = this.$opt.pageHeight || 500;
		var stack = [];

		var ele = cont.firstChild;

		var est = getEleStyle(cont);
		var contPdTop = parseFloat(est.paddingTop);
		var bound = cont.getBoundingClientRect();
		var baseTop = (bound.top + contPdTop) || 0;
		var curTop = 0;

		while(ele){
			if(ele.nodeName == "#text"){
				ele = ele.nextSibling;
			}else{
				if(!ele.firstChild || containers.indexOf(ele) == -1){
					
					bound = ele.getBoundingClientRect();
					var top = bound.top + ele.offsetHeight;
				
					if(top - baseTop > pageHeight){
						this.$_cache.marks
							.push({container: ele.parentNode, sibling: ele});
						
						est = getEleStyle(ele);
						var mgtop = parseFloat(est.marginTop);
						baseTop = bound.top - mgtop;
					}

					ele = ele.nextSibling;
				}else{
					stack.push(ele);
					ele = ele.firstChild;
				}
			}

			while(!ele && stack.length){
				ele = stack.pop();
				if(ele){
					ele = ele.nextSibling;
				}
			}
		}
	};

	var getEleStyle = function(element){
		return element.currentStyle || window.getComputedStyle(element);
	};

	x.pageBreak = function(ele){
		return new pageBreak(ele);
	};
})(window, window.jQuery);