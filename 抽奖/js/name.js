var box=document.getElementById('box');
        var btn=document.getElementById('btn');
        var btn1=document.getElementById('btn1');
        var btn2=document.getElementById('btn2');
        var bbt=document.getElementById('bbt');
        var luck=document.getElementById('luck');
        var mask=document.getElementById('mask');
        var divs=box.getElementsByTagName('div');
        var k=[];//创建一个数组用于记录中签的人
        for(var i=0;i<divs.length;i++){//给每个div绑定双击事件
            divs[i].index=i;//记录每个div的索引
            divs[i].ondblclick=edit;
        }
        var html;
        var t=0;
        function type() {//把中签结果像打字效果一样输出
            if (t <= html.length) {
                luck.children[0].innerText = html.substring(0, t++);
                setTimeout(type, 400);
            }
            else{
                t=0;
            }
        }
        function start(){
            btn.disabled=true;//避免重复点击
            btn1.disabled=true;
            btn2.disabled=true;
            var cut=setInterval(toggle,100);//开始抽奖
            mask.style.transform="scale(1)";
            setTimeout(function(){
                clearInterval(cut);
                var l=document.querySelector('.light');
                k.push(l.index);//记录中签的下标
                console.log(k);
                luck.style="top: 200px;";
                html="恭喜"+l.innerText+"成为天选之子";
                type();
                btn.disabled=false;//回复按钮的点击
                btn1.disabled=false;
                btn2.disabled=false;
            },2000);
        }
        bbt.onclick=function(){//去除遮罩层
            luck.style="top: -200px;";
            mask.style.transform="scale(0)";
        }
        var j;
        function toggle(){
            for(var i=0;i<divs.length;i++){
                    divs[i].className="";
            }
            j=Math.floor(Math.random()*divs.length);//取随机数
            var qc=k.some(value=>{//查询是否存在一样的值
                return value==j;
                });
                if(qc){
                if(k.length>=divs.length){//判断所有人是否都被抽过
                    alert("全部人都被点过一遍了");
                    k=[];//清空记录的数组
                }
                toggle();//存在一样的值就再取一次
                }else
                divs[j].className="light";
        }
        
        function edit(){//div内容编辑功能
            var str = this.innerHTML;
            this.innerHTML = '<input type="text" />';
            var input = this.children[0];
            input.value = str;
            input.select();//默认全选中
            input.onblur=function(){//失去焦点后改变div的值
                this.parentNode.innerText=this.value;
            }
        }
        function adddiv(){//添加div功能
            var div=document.createElement('div');
            div.innerText="双击可改名";
            box.appendChild(div);
            //添加div后重新获取div的数量以及给它绑定双击事件
            divs=box.getElementsByTagName('div');
            for(var i=0;i<divs.length;i++){
                divs[i].index=i;
                divs[i].ondblclick=edit;
            }
        }
        function remove(){//删除div功能
            divs[divs.length-1].remove();
            //添加div后重新获取div的数量以及给它绑定双击事件
            divs=box.getElementsByTagName('div');
            for(var i=0;i<divs.length;i++){
                divs[i].index=i;
                divs[i].ondblclick=edit;
            }
        }