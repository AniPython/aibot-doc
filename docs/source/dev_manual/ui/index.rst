=============================
界面开发
=============================

.. note::
    AiboteScriptUI底层基于chromium内核，可使用html、ccs等语言开发界面。另外我们底层添加四个函数用于实现脚本执行和传参。
    启动AiboteScriptUI.exe程序会自动附加当前目录下index.html文件，界面开发工作主要在这个文件

界面宽高
=============================
.. tabs::
    .. tab:: JavaScript

        .. code-block:: javascript

            SetAiboteSize(width, height);
            //AiboteScriptUI 宽高 由document.body.offsetHeight 和 document.body.offsetWidth决定
            //此函数脚本作者不可见，内部自动执行。脚本作者需要设定页面 body 宽高

    .. tab:: Python

        .. code-block:: python

            pass


启动脚本
=============================

.. tabs::
    .. tab:: JavaScript
        .. code-block:: javascript

            StartScript("../testAibote.js", true);
            //参数一 字符串型。要启动脚本的路径，空格分隔脚本参数。 脚本可通过 let args = process.argv.splice(2); 接收参数
            //参数二 布尔类型。是否显示控制台日志，true 显示控制台日志
            //返回值 脚本进程ID

    .. tab:: Python
        .. code-block:: python

            pass

停止脚本
=============================

.. tabs::
    .. tab:: JavaScript
        .. code-block:: javascript

            StopScript(processId);
            //参数一 数字型。脚本进程ID
            //成功返回true 失败返回false

    .. tab:: Python
        .. code-block:: python

            pass

输出日志
=============================

.. tabs::
    .. tab:: JavaScript
        .. code-block:: javascript

            PrintAiboteLog();
            //当StartScript第二个参数为 false 时有效，可以使用 setInterval 循环输出，输出10000字节时，会自动清空内容
            //返回脚本输出内容

    .. tab:: Python
        .. code-block:: python

            pass