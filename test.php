<!DOCTYPE html>
<html>
<head>
    <title>
        php学习
    </title>
</head>
<body>


<?php
echo "Hello World!";
?>

<?php
print "<h2>PHP 很有趣!</h2>";
print "Hello world!123123<br>";
print "我要学习 PHP!";
?>


<?php
$name="runoob";
$a= <<<EOF
        "abc"$name
        "123"
EOF;
// 结束需要独立一行且前后不能空格
echo $a;
print "<br>"
?>

<?php
$txt1="学习 PHP";
$txt2="RUNOOB.COM";
$cars=array("Volvo","BMW","Toyota");
 
print $txt1;
print "<br>";
print "在 $txt2 学习 PHP ";
print "<br>";
print "我车的品牌是 $cars[0]";
?>
<br>


<br>
<?php
$name="runoob";
$a= <<<EOF
        "abc"$name
        "123"
EOF;
// 结束需要独立一行且前后不能空格
echo $a;
?>
<br>
<!-- 松散比较：使用两个等号 == 比较，只比较值，不比较类型。
严格比较：用三个等号 === 比较，除了比较值，也比较类型。 -->
<?php
if(42 == "42") {
    echo '1、值相等';
}
echo PHP_EOL; // 换行符
 
if(42 === "42") {
    echo '2、类型相等';
} else {
    echo '3、不相等';
}
?>
<?php
$txt1="Hello world!";
$txt2="What a nice day!";
echo $txt1.$txt2;
echo "<br>";
echo strlen("Hello world!");
echo "<br>";
echo strpos("Hello world!","world");
$x = array("a" => "red", "b" => "green"); 
$y = array("c" => "blue", "d" => "yellow"); 
$z = $x + $y; // $x 和 $y 数组合并
var_dump($z);
var_dump($x == $y);
var_dump($x === $y);
var_dump($x != $y);
var_dump($x <> $y);
var_dump($x !== $y);
echo "<br>";
echo $z['a'];
?>
</body>
</html>




