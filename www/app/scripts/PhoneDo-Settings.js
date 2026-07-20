// Settings page tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Load saved settings when the page loads
    loadSavedSettings();
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Save settings button functionality
    const saveButton = document.getElementById('saveSettings');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Save settings to local storage
            saveSettings();
            
            // Show success toast
            app.toastMsg("Settings saved successfully");
            
            // Close the dialog
            app.hideDialog('dlgTidyOptions');
        });
    }
    
    // Function to load saved settings
    function loadSavedSettings() {
        // Editor Settings
        const indentSize = app.getOption('indentsize', 4);
        const indentWithTabs = app.getOption('tabindent', false);
        const indentChar = app.getOption('indentchar', ' ');
        const theme = app.getOption('theme', 'dark');
        
        // Formatting Settings
        const lineLength = app.getOption('wrapllen', 80);
        const preserveNewlines = app.getOption('presnl', false);
        const braceStyle = app.getOption('brcstyl', 'collapse');
        const keepArrayIndentation = app.getOption('arrindent', false);
        const keepFunctionIndentation = app.getOption('funcindent', false);
        const spaceInParen = app.getOption('spacepar', false);
        const endWithNewline = app.getOption('nle', true);
        
        // Behavior Settings
        const confirmScriptStop = app.getOption('confirmScriptStop', true);
        const confirmMinify = app.getOption('confirmMinify', true);
        const autoSave = app.getOption('autoSave', true);
        
        // Set values in the form
        document.getElementById('indentSize').value = indentSize;
        document.getElementById('indentWithTabs').value = indentWithTabs;
        document.getElementById('indentChar').value = indentChar;
        document.getElementById('theme').value = theme;
        
        document.getElementById('lineLength').value = lineLength;
        document.getElementById('preserveNewlines').value = preserveNewlines;
        document.getElementById('braceStyle').value = braceStyle;
        document.getElementById('keepArrayIndentation').value = keepArrayIndentation;
        document.getElementById('keepFunctionIndentation').value = keepFunctionIndentation;
        document.getElementById('spaceInParen').value = spaceInParen;
        document.getElementById('endWithNewline').value = endWithNewline;
        
        document.getElementById('confirmScriptStop').value = confirmScriptStop;
        document.getElementById('confirmMinify').value = confirmMinify;
        document.getElementById('autoSave').value = autoSave;
    }
    
    // Function to save settings to local storage
    function saveSettings() {
        // Editor Settings
        app.setOption('indentsize', document.getElementById('indentSize').value);
        app.setOption('tabindent', document.getElementById('indentWithTabs').value);
        app.setOption('indentchar', document.getElementById('indentChar').value);
        app.setOption('theme', document.getElementById('theme').value);
        
        // Formatting Settings
        app.setOption('wrapllen', document.getElementById('lineLength').value);
        app.setOption('presnl', document.getElementById('preserveNewlines').value);
        app.setOption('brcstyl', document.getElementById('braceStyle').value);
        app.setOption('arrindent', document.getElementById('keepArrayIndentation').value);
        app.setOption('funcindent', document.getElementById('keepFunctionIndentation').value);
        app.setOption('spacepar', document.getElementById('spaceInParen').value);
        app.setOption('nle', document.getElementById('endWithNewline').value);
        
        // Behavior Settings
        app.setOption('confirmScriptStop', document.getElementById('confirmScriptStop').value);
        app.setOption('confirmMinify', document.getElementById('confirmMinify').value);
        app.setOption('autoSave', document.getElementById('autoSave').value);
    }
}); 