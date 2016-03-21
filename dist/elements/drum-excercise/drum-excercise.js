'use strict';

(function () {
    'use strict';

    Polymer({
        is: 'drum-excercise',

        properties: {
            excercise: Object,
            isNameEdit: {
                type: Boolean,
                value: false
            },
            isBpmEdit: {
                type: Boolean,
                value: false
            }
        },

        completeTask: function completeTask() {
            this.set("excercise.bpm", ++this.excercise.bpm);
            this.fire("excerciseCompleted", { id: this.excercise.id });
        },

        editting: function editting(e) {
            e.stopPropagation();
        },

        editExcerciseName: function editExcerciseName(e) {
            var _this = this;

            e.stopPropagation();
            this.isNameEdit = true;

            //save the change and switch to view mode
            setTimeout(function () {
                _this.isNameEdit = false;
                _this.fire("excerciseUpdated", { id: _this.excercise.id });
            }, 15000);
        },

        editBpm: function editBpm(e) {
            var _this2 = this;

            e.stopPropagation();
            this.isBpmEdit = true;
            //save the change and switch to view mode
            setTimeout(function () {
                _this2.isBpmEdit = false;
                _this2.fire("excerciseUpdated", { id: _this2.excercise.id });
            }, 15000);
        }
    });
})();