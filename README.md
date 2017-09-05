# pagebreak

Utility to count number of pages and/or automatically insert page separators based on HTML DOM.

### Features

- Count pages
- Insert page separators
- Insert printing page breaks

### Demo code
```
pageBreak(document.body)
	.pageHeight(pageHeight)
	.containers([element1, element2])
	.addContainer(element3)
	.each(function(index, mark){
		var ele = document.createElement('hr');
		if(mark.sibling){
			mark.container.insertBefore(ele, mark.sibling);
		}else{
			mark.container.appendChild(ele);
		}
	})
	.insert(function(index){
		return '<hr/>';
	})
	.insert('<hr/>')
	.insert(element)
	.insertPageBreak()
	.count();
```
