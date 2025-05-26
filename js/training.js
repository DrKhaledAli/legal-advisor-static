// Training page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const urlInput = document.getElementById('url-input');
    const addUrlButton = document.getElementById('add-url-button');
    const pdfUpload = document.getElementById('pdf-upload');
    const uploadPdfButton = document.getElementById('upload-pdf-button');
    const trainingStatus = document.getElementById('training-status');
    const statusMessage = document.getElementById('status-message');
    const loadingSpinner = document.getElementById('loading-spinner');
    const sourcesList = document.getElementById('sources-list');
    const noSources = document.getElementById('no-sources');
    const clearSourcesButton = document.getElementById('clear-sources');
    
    // Load sources from localStorage
    let sources = JSON.parse(localStorage.getItem('legalAdvisorSources')) || [];
    
    // Initialize sources list
    updateSourcesList();
    
    // Event listeners
    addUrlButton.addEventListener('click', handleAddUrl);
    uploadPdfButton.addEventListener('click', handleUploadPdf);
    clearSourcesButton.addEventListener('click', clearSources);
    
    // Handle adding URL
    function handleAddUrl() {
        const url = urlInput.value.trim();
        if (!url) {
            showStatus('الرجاء إدخال رابط صحيح', false);
            return;
        }
        
        // Validate URL format
        if (!isValidUrl(url)) {
            showStatus('الرجاء إدخال رابط صالح يبدأ بـ http:// أو https://', false);
            return;
        }
        
        // Show loading state
        showStatus('جاري معالجة الرابط...', true);
        
        // Simulate processing delay
        setTimeout(function() {
            // Add to sources
            const newSource = {
                id: Date.now(),
                type: 'url',
                content: url,
                date: new Date().toLocaleDateString('ar-EG')
            };
            
            sources.push(newSource);
            saveSourcesAndUpdate();
            
            // Clear input and show success
            urlInput.value = '';
            showStatus('تم إضافة المحتوى من الرابط بنجاح', false);
        }, 1500);
    }
    
    // Handle uploading PDF
    function handleUploadPdf() {
        if (!pdfUpload.files || pdfUpload.files.length === 0) {
            showStatus('الرجاء اختيار ملف PDF', false);
            return;
        }
        
        const file = pdfUpload.files[0];
        
        // Validate file type
        if (file.type !== 'application/pdf') {
            showStatus('الرجاء اختيار ملف بصيغة PDF فقط', false);
            return;
        }
        
        // Show loading state
        showStatus(`جاري معالجة الملف: ${file.name}...`, true);
        
        // Simulate processing delay
        setTimeout(function() {
            // Add to sources
            const newSource = {
                id: Date.now(),
                type: 'pdf',
                content: file.name,
                date: new Date().toLocaleDateString('ar-EG')
            };
            
            sources.push(newSource);
            saveSourcesAndUpdate();
            
            // Clear input and show success
            pdfUpload.value = '';
            showStatus('تم إضافة المحتوى من الملف بنجاح', false);
        }, 2000);
    }
    
    // Clear all sources
    function clearSources() {
        sources = [];
        saveSourcesAndUpdate();
        showStatus('تم مسح جميع المصادر', false);
    }
    
    // Update sources list in UI
    function updateSourcesList() {
        if (sources.length === 0) {
            sourcesList.innerHTML = '';
            noSources.style.display = 'block';
            clearSourcesButton.style.display = 'none';
        } else {
            noSources.style.display = 'none';
            clearSourcesButton.style.display = 'block';
            
            sourcesList.innerHTML = '';
            sources.forEach(source => {
                const li = document.createElement('li');
                const sourceType = source.type === 'url' ? 'موقع' : 'ملف';
                li.textContent = `${sourceType}: ${source.content} (تمت الإضافة: ${source.date})`;
                
                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '×';
                deleteButton.className = 'delete-source';
                deleteButton.style.float = 'left';
                deleteButton.style.background = '#E74C3C';
                deleteButton.style.color = 'white';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '50%';
                deleteButton.style.width = '24px';
                deleteButton.style.height = '24px';
                deleteButton.style.cursor = 'pointer';
                deleteButton.style.marginLeft = '10px';
                
                deleteButton.addEventListener('click', function() {
                    sources = sources.filter(s => s.id !== source.id);
                    saveSourcesAndUpdate();
                });
                
                li.appendChild(deleteButton);
                sourcesList.appendChild(li);
            });
        }
    }
    
    // Save sources to localStorage and update UI
    function saveSourcesAndUpdate() {
        localStorage.setItem('legalAdvisorSources', JSON.stringify(sources));
        updateSourcesList();
    }
    
    // Show status message
    function showStatus(message, isLoading) {
        statusMessage.textContent = message;
        trainingStatus.style.display = 'flex';
        
        if (isLoading) {
            loadingSpinner.style.display = 'block';
            trainingStatus.classList.add('loading');
        } else {
            loadingSpinner.style.display = 'none';
            trainingStatus.classList.remove('loading');
            
            // Hide status after 3 seconds
            setTimeout(function() {
                trainingStatus.style.display = 'none';
            }, 3000);
        }
    }
    
    // Validate URL format
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});
