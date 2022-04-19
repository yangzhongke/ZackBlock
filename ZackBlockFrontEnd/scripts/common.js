function addScript(src)
{
	var s = document.createElement('script');
	s.setAttribute('src', src+'?'+new Date());
	document.body.appendChild( s );	
	return new Promise(r => s.onload=r);		  
}