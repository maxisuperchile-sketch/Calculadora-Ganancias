const $ = id => document.getElementById(id);
let counter = 0;

function calculate() {
    counter++;
    if (counter > 3) {
        $('payModal').classList.remove('hidden');
        return;
    }

    const pv = parseFloat($('precioVenta').value) || 0;
    const cp = parseFloat($('costoProd').value) || 0;
    const env = parseFloat($('envio').value) || 0;
    const emb = parseFloat($('embalaje').value) || 0;
    const ads = parseFloat($('ads').value) || 0;
    const ivaPorc = parseFloat($('iva').value) || 0;
    const otros = parseFloat($('otros').value) || 0;
    const tasaPago = parseFloat($('metodoPago').value);
    
    const montoIva = pv * (ivaPorc / 100);
    const montoComision = pv * tasaPago;
    const utilidad = pv - (cp + env + emb + ads + montoIva + otros + montoComision);
    const margen = pv > 0 ? (utilidad / pv) * 100 : 0;

    const formatCLP = (val) => '$' + Math.floor(val).toLocaleString('es-CL');

    $('utilidad').textContent = formatCLP(utilidad);
    $('utilidad').style.color = utilidad >= 0 ? '#16a34a' : '#dc2626';
    $('proyeccion').innerHTML = `Vendiendo 30 unidades, ganarías <strong>${formatCLP(utilidad * 30)}</strong>`;
    $('results').classList.remove('hidden');

    const badge = $('badge-alert');
    const sBox = $('status-box');
    const sTitle = $('status-title');
    const sDesc = $('status-desc');
    const sIcon = $('status-icon-div');

    if (margen > 15) {
        badge.textContent = 'Rentable'; badge.style.background = '#dcfce7'; badge.style.color = '#166534';
        sTitle.textContent = "Este producto es rentable";
        sDesc.textContent = "Tienes un buen margen para escalar el negocio.";
        sBox.style.background = '#f0fdf4'; sBox.style.color = '#166534'; sBox.style.border = '1px solid #bbf7d0';
        sIcon.innerHTML = '<i class="fas fa-chart-line" style="color: #16a34a;"></i>'; 
    } else {
        badge.textContent = 'No rentable'; badge.style.background = '#fee2e2'; badge.style.color = '#991b1b';
        sTitle.textContent = "No es rentable";
        sDesc.textContent = "Cuidado: Estás perdiendo dinero o el margen es muy bajo.";
        sBox.style.background = '#fef2f2'; sBox.style.color = '#991b1b'; sBox.style.border = '1px solid #fee2e2';
        sIcon.innerHTML = '<i class="fas fa-chart-line" style="color: #dc2626; transform: scaleY(-1);"></i>';
    }
}

$('calcBtn').addEventListener('click', calculate);