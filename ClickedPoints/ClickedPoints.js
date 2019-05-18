var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n\
        attribute float a_PointSize;\n\
        void main() {\n\
          gl_Position = a_Position;\n\
          gl_PointSize = a_PointSize;\n\
        }';

var FSHADER_SOURCE =
        'precision mediump float;\n\
        uniform vec4 u_FragColor;\n\
        void main() {\n\
            gl_FragColor = u_FragColor;\n\
        }';

    function main() {
        //获取<canvas>元素
        var canvas=document.getElementById('webgl');

        //获取WebGL上下文
        var gl = getWebGLContext(canvas, true);

        if (!gl) {
            alert("Failed at getWebGLContext");
            return;
        }
    
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            alert("Failed at initShaders");
            return;
        }

        //获取a_Position变量的存储位置
        var a_Position =gl.getAttribLocation(gl.program, 'a_Position');

        if (a_Position < 0) {
            alert("Failed to get a_Position");
            return;
        }
        var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
        var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
        //gl.vertexAttrib2fv(a_Position, new Float32Array([-0.5, -0.5]));
        //gl.vertexAttrib1f(a_PointSize, 100);
        //gl.uniform4f(u_FragColor, 0, 0, 1, 1);
        canvas.onmousedown=function (ev) { click(ev,gl,canvas,a_Position); }
        gl.clearColor(0, 0, 0, 1);//设置canvas背景颜色
        gl.clear(gl.COLOR_BUFFER_BIT);//清空canvas
    }
    var g_points=[];//鼠标点击位置数组
    function click(ev,gl,canvas,a_Position) {
        var x=ev.clientX;
        var y=ev.clientY;
        var rect=ev.target.getBoundingClientRect();
        x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
        y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
        g_points.push(x,y);
        gl.clear(gl.COLOR_BUFFER_BIT);//清空canvas
        var len=g_points.length;
        for (var i =0; i <len ;i++){
            gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],1.0);
            gl.drawArrays(gl.POINTS,0,1);
        }    
}      
    
    