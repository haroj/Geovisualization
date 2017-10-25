L.Control.SliderControl=L.Control.extend({options:{position:"topright",layers:null,timeAttribute:"time",isEpoch:!1,startTimeIdx:0,timeStrLength:19,maxValue:-1,minValue:0,showAllOnStart:!1,markers:null,range:!1,follow:!1,alwaysShowDate:!1,rezoom:null},initialize:function(a){L.Util.setOptions(this,a),this._layer=this.options.layer},extractTimestamp:function(a,b){return b.isEpoch&&(a=new Date(parseInt(a)).toString()),a.substr(b.startTimeIdx,b.startTimeIdx+b.timeStrLength)},setPosition:function(a){var b=this._map;return b&&b.removeControl(this),this.options.position=a,b&&b.addControl(this),this.startSlider(),this},onAdd:function(a){this.options.map=a;var b=L.DomUtil.create("div","slider",this._container);$(b).append('<div id="leaflet-slider" style="width:200px"><div class="ui-slider-handle"></div><div id="slider-timestamp" style="width:200px; margin-top:13px; background-color:#FFFFFF; text-align:center; border-radius:5px;"></div></div>'),$(b).mousedown(function(){a.dragging.disable()}),$(document).mouseup(function(){a.dragging.enable(),(c.range||!c.alwaysShowDate)&&$("#slider-timestamp").html("")});var c=this.options;if(this.options.markers=[],this._layer){var d=0;this._layer.eachLayer(function(a){c.markers[d]=a,++d}),c.maxValue=d-1,this.options=c}else console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});");return b},onRemove:function(a){for(i=this.options.minValue;i<=this.options.maxValue;i++)a.removeLayer(this.options.markers[i]);$("#leaflet-slider").remove()},startSlider:function(){_options=this.options,_extractTimestamp=this.extractTimestamp;var a=_options.minValue;for(_options.showAllOnStart&&(a=_options.maxValue,_options.range?_options.values=[_options.minValue,_options.maxValue]:_options.value=_options.maxValue),$("#leaflet-slider").slider({range:_options.range,value:_options.value,values:_options.values,min:_options.minValue,max:_options.maxValue,step:1,slide:function(a,b){var c=_options.map,d=L.featureGroup();if(_options.markers[b.value]){void 0!==_options.markers[b.value].feature?_options.markers[b.value].feature.properties[_options.timeAttribute]?_options.markers[b.value]&&$("#slider-timestamp").html(_extractTimestamp(_options.markers[b.value].feature.properties[_options.timeAttribute],_options)):console.error("Time property "+_options.timeAttribute+" not found in data"):_options.markers[b.value].options[_options.timeAttribute]?_options.markers[b.value]&&$("#slider-timestamp").html(_extractTimestamp(_options.markers[b.value].options[_options.timeAttribute],_options)):console.error("Time property "+_options.timeAttribute+" not found in data");var e;for(e=_options.minValue;e<=_options.maxValue;e++)_options.markers[e]&&c.removeLayer(_options.markers[e]);if(_options.range)for(e=b.values[0];e<=b.values[1];e++)_options.markers[e]&&(c.addLayer(_options.markers[e]),d.addLayer(_options.markers[e]));else if(_options.follow)for(e=b.value-_options.follow+1;e<=b.value;e++)_options.markers[e]&&(c.addLayer(_options.markers[e]),d.addLayer(_options.markers[e]));else for(e=_options.minValue;e<=b.value;e++)_options.markers[e]&&(c.addLayer(_options.markers[e]),d.addLayer(_options.markers[e]))}_options.rezoom&&c.fitBounds(d.getBounds(),{maxZoom:_options.rezoom})}}),!_options.range&&_options.alwaysShowDate&&$("#slider-timestamp").html(_extractTimeStamp(_options.markers[a].feature.properties[_options.timeAttribute],_options)),i=_options.minValue;i<=a;i++)_options.map.addLayer(_options.markers[i])}}),L.control.sliderControl=function(a){return new L.Control.SliderControl(a)};
