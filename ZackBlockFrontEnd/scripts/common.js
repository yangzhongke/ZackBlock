function addScript(src,useCache)
{
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.type = 'text/javascript';
	if(useCache)
	{
		s.setAttribute('src', src);
	}
	else
	{
		s.setAttribute('src', src+'?'+new Date());
	}
	document.body.appendChild( s );	
	return new Promise(r => s.onload=r);		  
}