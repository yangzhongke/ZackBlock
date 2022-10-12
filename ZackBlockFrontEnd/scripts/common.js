function addScript(src)
{
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.type = 'text/javascript';
	s.setAttribute('src', src+'?'+new Date());
	//s.setAttribute('src', src);
	document.body.appendChild( s );	
	return new Promise(r => s.onload=r);		  
}