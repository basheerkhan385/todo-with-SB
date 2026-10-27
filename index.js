const supabaseUrl = "https://ljhjzunkwqdwdflczygf.supabase.co";

const supabaseKey = "sb_publishable_EGM-Tbmrn-0-013kYs5hOA_Tv6nY_Io";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const checkUser = async () => {

    const response = await supabaseClient.auth.getUser();

    if (response.error || !response.data.user) {

        window.location.href = "pages/signin.html";

        return;
    }

    window.location.href = "pages/todos.html";
};

checkUser();