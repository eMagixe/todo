<template>
 <div class="modal-window">
    <div class="modal modal-small">
        <div class="modal-header">
            <span class="purple">Confirm action</span>
            <span @click="close" class="close">&times;</span>
        </div>
        <div class="modal-content">
            <slot></slot>
        </div>
        <div class="modal-footer">
            <button @click="response(false)" type="button" class="modal-btn modal-btn--cancel">Cancel</button>
            <button @click="response(true)" type="button" class="modal-btn">Yes</button>
        </div>
    </div>
 </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close');
        },
        /**
         * @param  {Boolean} answer - Response true or false 
         */
        response(answer) {
            this.$emit('response', answer);
            this.$emit('close');
        }
    }
}
</script>

<style>
    .modal-window {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
    }

    .modal {
        background-color: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #797979;
        border-radius: 4px;
    }

    .modal-small {
        max-width: 340px;
    }

    .modal-header {
        font-size: 24px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .purple {
        color: rgb(145,48,242);
    }

    .modal-content {
        padding: 15px 0;
        font-size: 18px;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 15px;
    }

    .modal-btn {
        width: 70px;
        height: 30px;
        line-height: 24px;
        background: rgb(145,48,242);
        border: 1px solid rgb(145,48,242);
        color: white;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
    }

    .modal-btn + .modal-btn {
        margin-left: 10px;
    }

    .modal-btn--cancel {
        background: white;
        color: rgb(145,48,242);
    }
</style>
