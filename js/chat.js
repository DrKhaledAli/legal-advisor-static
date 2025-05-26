// Chat page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const clearChatButton = document.getElementById('clear-chat');
    const exampleQuestions = document.querySelectorAll('.example-question');
    
    // Predefined legal QA pairs in Arabic
    const legalQAPairs = {
        'ما هي الخطوات القانونية لتأسيس شركة في مصر؟': 
            'لتأسيس شركة في مصر، يجب اتباع الخطوات التالية: 1) تحديد نوع الشركة (تضامن، توصية بسيطة، ذات مسؤولية محدودة، مساهمة). 2) تجهيز المستندات المطلوبة (عقد التأسيس، إثبات رأس المال، صور هويات الشركاء). 3) التقدم للهيئة العامة للاستثمار أو مكتب الشهر العقاري. 4) الحصول على السجل التجاري. 5) استخراج البطاقة الضريبية. 6) فتح ملف تأمينات اجتماعية. 7) استخراج رخصة مزاولة النشاط من الجهة المختصة.',
        
        'ما هي حقوقي كمستأجر في القانون المصري؟': 
            'كمستأجر في القانون المصري، تتمتع بالحقوق التالية: 1) الحق في عقد إيجار مكتوب يحدد مدة الإيجار وقيمته. 2) الحق في البقاء في العين المؤجرة طوال مدة العقد طالما تلتزم بشروطه. 3) الحق في إصلاح العيوب التي تعيق الانتفاع بالعين المؤجرة على نفقة المالك. 4) الحق في استرداد التأمين عند انتهاء العقد إذا لم تكن هناك أضرار. 5) الحق في إخطار مسبق قبل الإخلاء. يختلف القانون المطبق حسب تاريخ إبرام العقد (قانون قديم أو جديد).',
        
        'ما هي إجراءات الطلاق في مصر؟': 
            'إجراءات الطلاق في مصر تختلف حسب نوعه: 1) الطلاق بالإرادة المنفردة (من الزوج): يتم توثيقه في مكتب الشهر العقاري المختص. 2) الخلع: تتنازل الزوجة عن حقوقها المالية وترد الصداق مقابل الطلاق، ويتم رفع دعوى أمام محكمة الأسرة. 3) الطلاق للضرر: يتطلب رفع دعوى قضائية وإثبات الضرر. 4) بعد صدور حكم الطلاق، يجب استخراج شهادة الطلاق من مكتب التوثيق. 5) تسوية قضايا النفقة وحضانة الأطفال من خلال محكمة الأسرة.',
        
        'ما هي عقوبة السرقة في القانون المصري؟': 
            'عقوبة السرقة في القانون المصري تختلف حسب ظروف الجريمة: 1) السرقة البسيطة: الحبس من سنة إلى 3 سنوات. 2) السرقة بالإكراه: السجن من 3 إلى 7 سنوات. 3) السرقة باستخدام السلاح: السجن المشدد من 7 إلى 15 سنة. 4) سرقة المنازل: السجن المشدد. 5) سرقة السيارات: السجن المشدد. قد تشدد العقوبة في حالة العود أو تخفف في حالة رد المسروقات أو التصالح مع المجني عليه.',
        
        'كيف أسجل علامة تجارية في مصر؟': 
            'لتسجيل علامة تجارية في مصر، اتبع الخطوات التالية: 1) إجراء بحث مبدئي في سجلات العلامات التجارية للتأكد من عدم وجود علامة مشابهة. 2) تقديم طلب تسجيل إلى مكتب العلامات التجارية بوزارة التجارة والصناعة. 3) إرفاق صورة واضحة للعلامة وقائمة بالمنتجات أو الخدمات المراد تسجيل العلامة لها. 4) دفع الرسوم المقررة. 5) انتظار الفحص والنشر في جريدة العلامات التجارية. 6) إذا لم تكن هناك اعتراضات خلال 60 يوماً، يتم إصدار شهادة التسجيل. مدة الحماية 10 سنوات قابلة للتجديد.',
        
        'ما هي حقوق العمال في قانون العمل المصري؟': 
            'حقوق العمال في قانون العمل المصري تشمل: 1) الحق في عقد عمل مكتوب. 2) الحد الأدنى للأجور. 3) ساعات عمل لا تزيد عن 8 ساعات يومياً أو 48 ساعة أسبوعياً. 4) إجازة سنوية مدفوعة الأجر (21 يوم). 5) إجازة مرضية. 6) تأمينات اجتماعية وصحية. 7) مكافأة نهاية الخدمة. 8) إخطار مسبق قبل الفصل. 9) تعويض في حالة الفصل التعسفي. 10) الحق في الإضراب السلمي. 11) حماية خاصة للمرأة العاملة والأحداث.',
        
        'كيف أحصل على جنسية مصرية؟': 
            'للحصول على الجنسية المصرية، هناك عدة طرق: 1) بالميلاد لأب مصري أو لأم مصرية. 2) بالتجنس بعد الإقامة في مصر لمدة 10 سنوات متتالية والوفاء بشروط أخرى مثل البلوغ، سلامة العقل، حسن السلوك، معرفة اللغة العربية، ووجود مصدر دخل مشروع. 3) للمرأة الأجنبية المتزوجة من مصري بعد مرور سنتين على الزواج. 4) في حالات استثنائية بقرار من وزير الداخلية للأشخاص ذوي الكفاءات الخاصة أو الخدمات الجليلة لمصر. يتم تقديم الطلب إلى وزارة الداخلية مع المستندات المطلوبة.',
        
        'ما هي إجراءات رفع دعوى قضائية في مصر؟': 
            'إجراءات رفع دعوى قضائية في مصر تشمل: 1) تحرير صحيفة الدعوى متضمنة بيانات المدعي والمدعى عليه وموضوع الدعوى والطلبات. 2) تقديم الصحيفة إلى قلم كتاب المحكمة المختصة مع المستندات المؤيدة. 3) دفع الرسوم القضائية. 4) تحديد جلسة لنظر الدعوى. 5) إعلان المدعى عليه بصحيفة الدعوى عن طريق محضر. 6) حضور الجلسات وتقديم المذكرات والمستندات. 7) قد تستغرق الدعوى عدة جلسات قبل صدور الحكم. 8) يمكن استئناف الحكم خلال المدة القانونية إذا كان قابلاً للاستئناف.',
        
        'ما هي حقوق الملكية الفكرية في مصر؟': 
            'حقوق الملكية الفكرية في مصر تشمل: 1) حقوق المؤلف: تحمي الأعمال الأدبية والفنية لمدة حياة المؤلف + 50 سنة بعد وفاته. 2) براءات الاختراع: تحمي الاختراعات الجديدة لمدة 20 سنة. 3) العلامات التجارية: تحمي الشعارات والأسماء التجارية لمدة 10 سنوات قابلة للتجديد. 4) النماذج والرسوم الصناعية: تحمي التصميمات لمدة 10 سنوات. 5) المؤشرات الجغرافية: تحمي أسماء المنتجات المرتبطة بمناطق جغرافية معينة. يتم تسجيل هذه الحقوق لدى الجهات المختصة مثل مكتب براءات الاختراع ومكتب العلامات التجارية.',
        
        'ما هي قوانين الميراث في مصر؟': 
            'قوانين الميراث في مصر تستند إلى الشريعة الإسلامية للمسلمين وقوانين الأحوال الشخصية للمسيحيين. للمسلمين: 1) الورثة بالفرض: لهم نصيب محدد مثل الزوج/الزوجة، الأب، الأم، البنات. 2) الورثة بالتعصيب: يرثون ما تبقى بعد أصحاب الفروض مثل الابن. 3) توزع التركة بعد سداد الديون وتنفيذ الوصية (في حدود ثلث التركة). للمسيحيين: تختلف حسب الطائفة، وعموماً تقسم التركة بالتساوي بين الأبناء ذكوراً وإناثاً مع نصيب للزوج/الزوجة. يتم حصر التركة وإصدار إعلام وراثة من المحكمة المختصة.'
    };
    
    // Initialize chat with welcome message
    addMessage('مرحباً بك! كيف يمكنني مساعدتك اليوم في استشارتك القانونية؟', 'ai');
    
    // Event listeners
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    clearChatButton.addEventListener('click', function() {
        chatMessages.innerHTML = '';
        addMessage('مرحباً بك! كيف يمكنني مساعدتك اليوم في استشارتك القانونية؟', 'ai');
    });
    
    exampleQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            userInput.value = this.textContent;
            userInput.focus();
        });
    });
    
    // Handle sending a message
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message typing';
        typingIndicator.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI thinking time
        setTimeout(function() {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Generate AI response
            let response = '';
            
            // Check for exact matches in predefined QA pairs
            if (legalQAPairs[message]) {
                response = legalQAPairs[message];
            } else {
                // Check for partial matches
                const userQuestion = message.toLowerCase();
                let bestMatch = '';
                let highestScore = 0;
                
                Object.keys(legalQAPairs).forEach(question => {
                    const questionLower = question.toLowerCase();
                    // Simple matching algorithm - count matching words
                    const userWords = userQuestion.split(/\s+/);
                    let matchScore = 0;
                    
                    userWords.forEach(word => {
                        if (word.length > 2 && questionLower.includes(word)) {
                            matchScore++;
                        }
                    });
                    
                    if (matchScore > highestScore) {
                        highestScore = matchScore;
                        bestMatch = question;
                    }
                });
                
                if (highestScore > 0) {
                    response = legalQAPairs[bestMatch];
                } else {
                    response = 'عذراً، لا أستطيع الإجابة على هذا السؤال بشكل محدد. هل يمكنك إعادة صياغة سؤالك أو طرح سؤال آخر متعلق بالقانون المصري؟';
                }
            }
            
            // Add AI response
            addMessage(response, 'ai');
        }, 1500);
    }
    
    // Add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-timestamp">
                ${timeString}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
