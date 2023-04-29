const requests = {
    // baseurl: `http://192.168.10.85:8000/api`,
    baseurl: `http://127.0.0.1:8000/api`,


    get_all_users:`/get_all_users`,


    login: `/login`,
    fetchuserbytoken: `/me`,
    parkInCheck: `/park_in_check`,
    parkIn: `/park_in`,
    park_out_check: `/park_out_check`,
    park_out_add_player: `/park_out_add_player`,
    park_out_single_player: `/park_out_single_player`,
    park_out: `/park_out`,
    park_out_del_player: `/park_out_del_player`,



    park_out_add_water: `/park_out_add_water`,
    park_out_edit_water: `/park_out_edit_water`,
    park_out_add_socks: `/park_out_add_socks`,
    park_out_edit_socks: `/park_out_edit_socks`,
    park_out_add_deposit: `/park_out_add_deposit`,
    park_out_edit_deposit: `/park_out_edit_deposit`,



    get_all_settings: `/get_all_settings`,
    set_first_interval_cost: `/set_first_interval_cost`,
    set_increment_cost: `/set_increment_cost`,
    set_sock_cost: `/set_sock_cost`,
    set_water_cost: `/set_water_cost`,
    set_first_interval_time: `/set_first_interval_time`,
    set_additional_time: `/set_additional_time`,
    get_all_normal_cards: `/get_all_normal_cards`,
    change_card_park_off: `/change_card_park_off`,
    delete_normal_card: `/delete_normal_card`,
    register_cards: `/register_cards`,
    switch_isbill: `/switch_isbill`,



    get_parking_records: `/get_parking_records`,
    get_sales_report: `/get_sales_report`,



    membership_type: `/membership_type`,
    membership_user: `/membership_user`,
    membership_taken: `/membership_taken`,
    // membership_user:`/membership_user`,





    package_type: `/package_type`,
    package_user: `/package_user`,
    package_taken: `/package_taken`,


    get_suggestion_list: `/get_suggestion_list`,

    downloadapk:`/downloadapk`,









    register: `/create`,
    forget: `/forget`,
    reset: `/reset`,

    search: `/authprofile`,
    guestSearch: `/guestprofile`,

    linkSearch: `/search`,

    subject: `/subjects`,
    adminsubjects: `/adminsubjects`,
    subjectsbyusertoken: `/subjectbytoken`,
    studentsbysubject: `/studentsbysubject`,
    unlinkfile: `/unlinkfile`,
    allstudents: `/allstudents`,
    adminchangepassword: `/adminchangepassword`,
    studentssubList: `/studentssublist`,
    delsubjectfromuser: `/delsubjectfromuser`,
    delsubjectfromuseremail: `/delsubjectfromuseremail`,
    adminaddsubject: `/adminaddsubject`,
    studentaddsubject: `/studentaddsubject`,
    subjectbyuserid: `/subjectbyuserid`,
    subjectbyuseremail: `/subjectbyuseremail`,

    stopupload: `/stopupload`,
    startupload: `/startupload`,

    downloadpdf: `/download`,

    uploadquestion: `/uploadquestion`,
    uploadanswer: `/uploadanswer`,

    uploadanswerkanya: `/uploadanswerkanya`,



    downloadzip: `/zip`,
    makezip: `/makezip`,

    deletestudent: `/deletestudent`,

    todayexam: `/todayexam`,



};

export default requests;
