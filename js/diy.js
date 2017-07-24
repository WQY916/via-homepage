var d = new Date()
var time = d.getHours()
if (time>22||time<6)
{
document.getElementById("title").innerHTML="还不睡?";
}
if (time>5&&time<8) 
{
document.getElementById("title").innerHTML="早上好!";
}
if (time>7&&time<11) 
{
document.getElementById("title").innerHTML="上午好!";
}
if (time>10&&time<15) 
{
document.getElementById("title").innerHTML="中午好!";
}
if (time>14&&time<18) 
{
document.getElementById("title").innerHTML="下午好!";
}
if (time>17&&time<21) 
{
document.getElementById("title").innerHTML="晚上好!";
}
if (time>20&&time<23) 
{
document.getElementById("title").innerHTML="夜深了~";
}



var last_kw = '';
var max_sug_len = 1;

function get_suggest() {
	var a = document.getElementById('search_input').value;
	var b = document.getElementById('clear');
	if (a) b.style.display = 'block';
	else b.style.display = 'none';
	if (a == last_kw) return;
	last_kw = a;
	if (!a || a.length < max_sug_len) {
		close_sug();
		return
	}
	var c = document.createElement('script');
	c.type = 'text/javascript';
	c.src = 'http://sugs.m.sm.cn/web?t=w&uc_param_str=dnnwnt&scheme=http&fr=android&bid=1&q=' + encodeURIComponent(a) + '&_=' + new Date().getTime() + '&callback=jsonp3';
	var d = document.querySelector('head');
	c.onload = function() {
		d.removeChild(c)
	};
	d.appendChild(c)
}
function jsonp3(a) {
	var b = document.getElementById('suggest');
	if (!a.r || !a.r.length) {
		b.style.display = 'none';
		return
	}
	var c = '';
	a.r.forEach(function(v) {
		c += '<li>' + v.w + '<b></b></li>'
	});
	document.getElementById('suglist').innerHTML = c;
	b.style.display = 'block'
}
function close_sug() {
	last_kw = '';
	document.getElementById('suggest').style.display = 'none'
}
function move_input() {
	document.body.scrollTop = document.getElementById('search_form').offsetTop - 2
}
function clear_seach() {
	var a = document.getElementById('search_input');
	a.value = '';
	document.getElementById('clear').style.display = 'none';
	close_sug();
	a.focus()
}
function search() {
	if (document.getElementById("search_input").value != "") {
		window.location.href = "http://m.baidu.com/s?ie=utf-8&rn=30&tn=baiduhome_pg&oq=%E5%BC%A0%E7%B1%BD%E6%B2%90&rsv_enter=0&wd=" + document.getElementById("search_input").value;
		document.getElementById("search_input").value = ""
	}
	return false
}
document.getElementById('suglist').addEventListener('click', function(e) {
	var a = document.getElementById('search_input');
	if (e.target.tagName == 'B') {
		a.value = e.target.parentNode.firstChild.textContent;
		a.focus()
	} else if (e.target.tagName == 'LI') {
		a.value = e.target.firstChild.textContent;
		close_sug();
		search()
	}
});
window.addEventListener('resize', move_input);
