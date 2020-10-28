import $ from 'jquery'

$(document).ready(function () {
    // $('.showMenu').on('click', function (event) {
    //     event.preventDefault()
    //     $('.menu').removeClass('menu-hide')
    //     $('.menu').toggleClass('menu-show')
    //     $('.menu li').css('z-index', 100)
    // })

    // $(document).click(function (event) {
    //     event.stopPropagation()
    //     // event.preventDefault()
    //     var showMenu = $('.showMenu img')
    //     if (!showMenu.is(event.target)) {
    //         $('.menu').toggleClass('menu-hide')
    //         $('.menu').removeClass('menu-show')
    //     }
    // })
    $('.showMenu').on('click', function (event) {
        event.preventDefault()
        $('.left_menu').toggleClass('active')
    })
    $('.close_btn a').on('click', function (event) {
        event.preventDefault()
        $('.left_menu').toggleClass('active')
    })
    $('#menuUl li').on('click', function (event) {
        event.preventDefault()
        $('.left_menu').toggleClass('active')
    })
    $('.selection_btn_phone').on('click', function (event) {
        event.preventDefault()
        $('.selection_phone').toggleClass('active')
        $('.MultiFilterArea').toggleClass('active')
        $('.filter').toggleClass('active')
        $('.MultiFilterArea').css('display', 'none')
        $('.filter').css('display', 'none')
        $('.selection_phone').css('background', 'rgb(47, 58, 76, 0)')
        $('.select_btn1').css('background', 'rgb(47, 58, 76)')
        $('.select_btn2').css('background', 'rgb(47, 58, 76)')
    })
    $('.select_btn1').on('click', function (event) {
        event.preventDefault()
        $('.MultiFilterArea').css('display', 'block')
        $('.filter').css('display', 'none')
        $('.selection_phone').css('background', 'rgb(218, 226, 236)')
        $('.select_btn1').css('background', 'rgb(182, 96, 96)')
        $('.select_btn2').css('background', 'rgb(47, 58, 76)')
    })
    $('.select_btn2').on('click', function (event) {
        event.preventDefault()
        $('.MultiFilterArea').css('display', 'none')
        $('.filter').css('display', 'block')
        $('.selection_phone').css('background', 'rgb(218, 226, 236)')
        $('.select_btn1').css('background', 'rgb(47, 58, 76)')
        $('.select_btn2').css('background', 'rgb(182, 96, 96)')
    })
})
