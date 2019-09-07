/**
 * Animation to show content like a dropdown
 * @param {Array} plainIds 
 */
export default function showContent(plainIds) {
    const iconIds = plainIds.map(val => 'open-'+val);
    for (let i = 0; i < iconIds.length; i++) {
        document.getElementById(iconIds[i]).addEventListener('click', function() {
            const elem = document.getElementById(iconIds[i].split('-')[1]);
            let interval;
            let height;
            let goal;
    
            if(!elem.classList.contains('active')) {
                elem.style.height = 'auto';
                const h = elem.offsetHeight;
                elem.style.height = '0';
                height = h;
                goal = h;
                interval = setInterval(frame, 3);
                elem.classList.add('active');
            }
            else {
                const h = elem.offsetHeight;
                height = -h;
                goal = 0;
                interval = setInterval(frame, 3);
                elem.classList.remove('active');
            }
            function frame() {
                    if (elem.style.height.substring(0, elem.style.height.length-2) == goal) {
                    clearInterval(interval);
                    } else {
                        elem.style.height = Number(elem.style.height.substring(0, elem.style.height.length-2))+height/100+'px';
                    
                    }
            }
        });
    }
}