var app = new Vue({

    el: "#app",
    components: {
        litask,
        modalcomponent,
        draggable: window['vuedraggable']
    },
    data() {
        return {
            modalInput: {},
            forms: [],
            counter: 0
        }
    },
    methods: {

        createCard() {
            this.incrementCounter()
            this.forms.push(this.createEmptyCardObject())
            this.saveLocal();
        },
        deleteTaskFromId(id) {
            this.forms.splice(this.getIndexFromId(id), 1)
            this.saveLocal();
        },
        updateTaskFromObject(modal) {
            this.forms.splice(this.getIndexFromId(modal.id), 1, this.editFormById(modal.title, modal.description, modal.name, modal.id))
            this.saveLocal();
        },
        saveModalFormData(form) {
            this.modalInput = form
        },
        saveOrder() {
            this.saveLocal()
        },


        //******************************************************    Métodos útiles    ****************************************************

        saveLocal() {
            window.localStorage.setItem('forms', JSON.stringify(this.forms))
            window.localStorage.setItem('counter', this.counter)
        },
        getLocal() {
            return JSON.parse(window.localStorage.getItem('forms'))
        },
        getIndexFromId(identificator) {
            return this.forms.indexOf(this.forms.find(e => e.id == identificator))
        },
        createEmptyCardObject() {
            return { title: "", description: "", name: "", id: this.counter, date: this.getLocalDate() }
        },
        incrementCounter() {
            this.counter++
        },
        editFormById(title, description, name, id) {

            var res = this.forms.find(e => e.id == id)
            res.title = title
            res.description = description
            res.name = name
            return res
        },
        getLocalDate() {
            return new Date();
        },
        loadLocalData() {
            if (window.localStorage.getItem('forms')) {
                this.forms = JSON.parse(window.localStorage.getItem('forms'))
                this.counter = window.localStorage.getItem('counter')
            }
        },
        printSomething() {
            console.log("your call is working")
        }
    },

    //***********************************    Cargar datos almacenados en LocalStorage al iniciar app   ***********************************

    mounted() {
        this.loadLocalData();
    }

});