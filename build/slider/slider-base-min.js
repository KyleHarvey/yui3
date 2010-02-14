YUI.add("slider-base",function(B){function A(){A.superclass.constructor.apply(this,arguments);}B.SliderBase=B.extend(A,B.Widget,{initializer:function(){this.axis=this.get("axis");this._key={dim:(this.axis==="y")?"height":"width",minEdge:(this.axis==="y")?"top":"left",maxEdge:(this.axis==="y")?"bottom":"right"};this.publish("thumbMove",{defaultFn:this._defThumbMoveFn,queue:true});},renderUI:function(){var C=this.get("contentBox");this.rail=this._renderRail();this._uiSetRailLength();this.thumb=this._renderThumb();this.rail.appendChild(this.thumb);C.appendChild(this.rail);C.addClass(this.getClassName(this.axis));},_renderRail:function(){var D=this.getClassName("rail","cap",this._key.minEdge),C=this.getClassName("rail","cap",this._key.maxEdge);return B.Node.create(B.substitute(this.RAIL_TEMPLATE,{railClass:this.getClassName("rail"),railMinCapClass:D,railMaxCapClass:C}));},_uiSetRailLength:function(){this.rail.setStyle(this._key.dim,this.get("length"));},_renderThumb:function(){var C=this.get("thumbUrl");return B.Node.create(B.substitute(this.THUMB_TEMPLATE,{thumbClass:this.getClassName("thumb"),thumbShadowClass:this.getClassName("thumb","shadow"),thumbImageClass:this.getClassName("thumb","image"),thumbShadowUrl:C,thumbImageUrl:C}));},bindUI:function(){this._bindThumbDD();this._bindValueLogic();this.after("disabledChange",this._afterDisabledChange);this.after("lengthChange",this._afterLengthChange);},_bindThumbDD:function(){var C={constrain:this.rail};C["stick"+this.axis.toUpperCase()]=true;this._dd=new B.DD.Drag({node:this.thumb,bubble:false,on:{"drag:start":B.bind(this._onDragStart,this)},after:{"drag:align":B.bind(this._afterAlign,this),"drag:end":B.bind(this._afterDragEnd,this)}});this._dd.plug(B.Plugin.DDConstrained,C);},_bindValueLogic:function(){},_onDragStart:function(C){this.fire("slideStart",{ddEvent:C});},_afterAlign:function(C){this.fire("thumbMove",{ddEvent:C});},_afterDragEnd:function(C){this.fire("slideEnd",{ddEvent:C});},_afterDisabledChange:function(C){this._dd.set("lock",true);},_afterLengthChange:function(C){this._uiSetRailLength();},syncUI:function(){this._syncThumbPosition();},_syncThumbPosition:function(){},_setAxis:function(C){C=(C+"").toLowerCase();return(C==="x"||C==="y")?C:B.Attribute.INVALID_VALUE;},_setLength:function(D){D=(D+"").toLowerCase();var E=parseFloat(D,10),C=D.replace(/[\d\.\-]/g,"")||this.DEF_UNIT;return E>0?(E+C):B.Attribute.INVALID_VALUE;},_initThumbUrl:function(){var D=this.getSkinName()||"sam",C=B.config.base+"slider/assets/skins/"+D;return C+"/thumb-"+this.axis+".png";},BOUNDING_TEMPLATE:"<span></span>",CONTENT_TEMPLATE:"<span></span>",RAIL_TEMPLATE:'<span class="{railClass}">'+'<span class="{railMinCapClass}"></span>'+'<span class="{railMaxCapClass}"></span>'+"</span>",THUMB_TEMPLATE:'<span class="{thumbClass}" tabindex="-1">'+'<img src="{thumbShadowUrl}" '+'alt="Slider thumb shadow" '+'class="{thumbShadowClass}">'+'<img src="{thumbImageUrl}" '+'alt="Slider thumb" '+'class="{thumbImageClass}">'+"</span>"},{NAME:"sliderBase",ATTRS:{axis:{value:"x",writeOnce:true,setter:"_setAxis",lazyAdd:false},length:{value:"150px",setter:"_setLength"},thumbUrl:{valueFn:"_initThumbUrl",validator:B.Lang.isString}}});},"@VERSION@",{requires:["widget","substitute","dd-constrain"]});