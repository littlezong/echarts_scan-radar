function initRadar(mockData){
	var container = document.getElementById('main');
	var radar = echarts.init(container);
	var minAngle = 10;	// 最小角度
	var indicator = [];
	var data = [];
	var idx = 0;
	var randomArr = getRandom(360 / minAngle, mockData.length);
	for(var i=0;i<360 / minAngle;i++){
		if(randomArr.indexOf(i) > -1){
			indicator.push({
				text: mockData[idx].text
			});
			data.push(mockData[idx].value);
			idx++;
		}else{
			indicator.push({
				text: i * 10 + '`'
			});
			data.push('-');
		}
	};
	var option = {
		backgroundColor: '#333',
	    radar: [
	        {
	            indicator: indicator,
	            center: ['50%', '50%'],
	            radius: 180,
	            startAngle: 90,
	            splitNumber: 4,
	            shape: 'circle',
	            name: {
	            	show: false,
	                // formatter:'【{value}】',
	                // textStyle: {
	                //     color:'rgba(0, 255, 51, 1)'
	                // }
	            },
	            splitArea: {
	                areaStyle: {
	                	color: 'rgba(255, 255, 255, 0)'
	                }
	            },
	            axisLine: {
	                lineStyle: {
	                    color: 'rgba(0, 255, 51, 0)'
	                }
	            },
	            splitLine: {
	                lineStyle: {
	                    color: 'rgba(0, 255, 51, 1)'
	                }
	            }
	        }
	    ],
	    series: [
	        {
	            name: '雷达图',
	            type: 'radar',
	            symbol: 'circle',
	            symbolSize: 24,
	            silent: true,
	            animationEasing: 'quarticOut',
	            animationEasingUpdate: 'quarticOut',
	            animationDuration: 2000,
	            animationDurationUpdate: 2000,
	            label: {
	            	normal: {
	            		show: true,
	            		textStyle: {
	            			color: 'rgba(0, 255, 51, 1)'
	            		}
	            	}
	            },
	            itemStyle: {
                	normal: {
                		opacity: 0
                	},
                	emphasis: {
                    	color: {
                    		type: 'radial',
                    		x: 0.5,
                    		y: 0.5,
                    		r: 0.3,
                    		colorStops: [{
                    			offset: 0,
                    			color: 'rgba(0, 255, 51, 1)'
                    		}, {
                    			offset: 1,
                    			color: 'rgba(255, 255, 255, .1)'
                    		}]
                    	},
                    	borderWidth: 0, 
                    	opacity: 1
                    }
                },
	            data: [
	                {
	                    value: data,
	                    label: {
	                    	normal: {
	                    		textStyle: {
	                    			color: 'rgba(0, 255, 51, 1)'
	                    		}
	                    	}
	                    },
	                    lineStyle: {
	                        normal: {
	                            opacity: 0
	                        }
	                    }
	                }
	            ]
	        }
	    ]
	};

	radar.setOption(option);

	function getRandom(range, count){
		var randomArr = [];
		for(var i = 0;i < count;i++){
			var r = Math.round(Math.random() * (range - 1));
			randomArr.push(r);
		}
		return randomArr;
	}

	// 点动画
	(function(){
		var highlight = false;
		var type;
		setInterval(function(){
			type = highlight ? 'downplay' : 'highlight';
			radar.dispatchAction({
				type: type,
				seriesIndex: 0
			});
			highlight = !highlight;
		}, 2000);
	})();
	
	setTimeout(function(){
		initRadar(mockData);
	}, 4000);
}