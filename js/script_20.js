                                      
    // Append distinct_id + session_id to outbound gkb-technologies.cloud links                                                               
    // so the console can bootstrap identity and continue the session.                                                             
    document.addEventListener('click', function(e) {                                                                               
      var a = e.target.closest('a');                                                                                               
      if (!a || !a.href) return;                                                                                                   
      if (!/gkb-technologies\.cloud/.test(a.href)) return;                                              
      if (typeof posthog === 'undefined' || !posthog.get_distinct_id) return;                                                      
      try {                                                                                                                        
        var url = new URL(a.href);                                                                                                 
        url.searchParams.set('distinct_id', posthog.get_distinct_id());                                                            
        var sid = posthog.get_session_id && posthog.get_session_id();                                                              
        if (sid) url.searchParams.set('session_id', sid);                                    
        a.href = url.toString();                                                                                                   
      } catch (err) {}                          
    }, true);                                                                                                                      
  