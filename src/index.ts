import app from "./express.js";
import { createStudent } from "./accounts.js";
app.listen(3000, async () => {
    console.log("Listening on port 3000");
    console.log(
        await createStudent(
            "securepw",
            {
                info: {
                    first_name: "Flavian",
                    last_name: "Züllig",
                    middle_name: null,
                    postal_code: "4104",
                    city: "Oberwil",
                    street: "Kummelenstrasse",
                    house_number: "24",
                    profile: "A",
                    birthday: "14-09-2007",
                    landline: "0613610232",
                    mobile: "0774056968",
                    hometown: "Egnach",
                    second_hometown: null,
                    ahv_number: "87640198692871",
                    nationality: "CH",
                    first_language: "de-CH",
                    email_private: "flavianzuellig@hotmail.com",
                    subjects: "1,2",
                },
                guardians: {
                    "1": {
                        info: {
                            first_name: "Angelica",
                            last_name: "Kühni",
                            mobile: "0793423526",
                            email: "angelicakuehni@hotmail.com",
                            number: "1",
                        },
                    },
                    "2": {
                        info: {
                            first_name: "Martin",
                            last_name: "Züllig",
                            mobile: "0793423524",
                            email: "martinzuellig@hotmail.com",
                            number: "2",
                        },
                    },
                    "3": {
                        info: {
                            first_name: null,
                            last_name: null,
                            mobile: null,
                            email: null,
                            number: "3",
                        },
                    },
                },
            },
            1
        )
    );
});
