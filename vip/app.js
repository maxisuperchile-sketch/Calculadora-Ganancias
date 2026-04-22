const $ = id => document.getElementById(id);

function calculate() {
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
    
    $('proyeccion').innerHTML = `Si haces 30 ventas al mes, el resultado sería <strong>${formatCLP(utilidad * 30)}</strong>`;
    $('results').classList.remove('hidden');

    const badge = $('badge-alert');
    const sBox = $('status-box');
    const sTitle = $('status-title');
    const sDesc = $('status-desc');
    const sIcon = $('status-icon-div');

    if (margen > 15) {
        badge.textContent = 'Buen margen'; 
        badge.style.background = '#dcfce7'; badge.style.color = '#166534';
        sTitle.textContent = "Este producto es Rentable";
        sDesc.textContent = "Tienes un margen sólido después de cubrir costos e impuestos. Es un buen negocio.";
        sBox.style.background = '#f0fdf4'; sBox.style.color = '#166534'; sBox.style.border = '1px solid #bbf7d0';
        sIcon.innerHTML = '<i class="fas fa-chart-line"></i>'; 
    } else if (margen > 0) {
        badge.textContent = 'Margen ajustado'; 
        badge.style.background = '#fef3c7'; badge.style.color = '#92400e';
        sTitle.textContent = "Revisa tus costos";
        sDesc.textContent = "La ganancia es muy baja. Cualquier imprevisto te dejará en números rojos. Evalúa subir el precio.";
        sBox.style.background = '#fffbeb'; sBox.style.color = '#92400e'; sBox.style.border = '1px solid #fef3c7';
        sIcon.innerHTML = '<i class="fas fa-chart-bar"></i>';
    } else {
        badge.textContent = 'Pérdida total'; 
        badge.style.background = '#fee2e2'; badge.style.color = '#991b1b';
        sTitle.textContent = "No es Rentable";
        sDesc.textContent = "Atención: Estás perdiendo plata en cada venta. Los costos operativos superan tus ingresos; no sigas escalando este producto sin ajustar los números.";
        sBox.style.background = '#fef2f2'; sBox.style.color = '#991b1b'; sBox.style.border = '1px solid #fee2e2';
        sIcon.innerHTML = '<i class="fas fa-chart-line" style="transform: scaleY(-1);"></i>';
    }
}

$('calcBtn').addEventListener('click', calculate);