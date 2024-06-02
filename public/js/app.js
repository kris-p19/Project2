$(document).ready(function(){
    fetch('/resource/layouts/navbar.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response => response.text())
    .then(data => {
        $('#navbar-container').html(data);
    })
    .catch(error => console.error('Error loading navbar:', error));

    fetch('/resource/layouts/footer.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response2 => response2.text())
    .then(data2 => {
        $('#footer-container').html(data2);
    })
    .catch(error => console.error('Error loading footer:', error));

    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    const path = params.get('path') || '/';
    const user = params.get('user') || '';
    fetch(`/resource/views/${path}/${page}.html?no-cache=${Math.random()}`,{ cache: 'no-store' })
    .then(response3 => {
        if (!response3.ok) {
            throw new Error('Network response was not ok');
        }
        return response3.text();
    })
    .then(data3 => {
        $('#content-container').html(data3);
        if (user!=undefined&&user!='') {
            $('#content-container').find('blockquote')
                .attr('cite','https://www.tiktok.com/@' + user + '?time=' + Math.random())
                .attr('data-unique-id', user);
            $('#content-container').find('blockquote section a').attr('href','https://www.tiktok.com/@' + user + '?refer=creator_embed&time=' + Math.random());
            $('#content-container').find('#title').text('@' + user);
            $('meta[name="description"]').attr('content',user);
            $('meta[name="keywords"]').attr('content', user + ',Pound-DEV,Developer,Programer');
            $('title').text( user + ' - Pound-DEV');
            setTimeout(() => {
                $('#content-container').find('blockquote').trigger('click'); 
            }, 1000);
        }
    })
    .catch(error => {
        $('#content-container').html('<p>Sorry, the requested page could not be loaded.</p>');
        console.error('Error loading page:', error);
    });
});