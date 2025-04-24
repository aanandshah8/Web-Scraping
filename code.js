(() => {
    const result = {
        highlights: [],
        overview: "",
        age_range: "",
        availability: "",
        minimum_stay: "",
        price: "",
        main_language: "",
        number_of_campers: "",
        gender: "",
        bedrooms: "",
        activities: [],
        language_lessons: "",
        languages_taught: ["English"], // Based on page content
        accommodation_and_facilities: {
            type: "",
            location: [
                "Epsom College, Malaysia",
                "Hakuba, Japan"
            ],
            facilities: []
        }
    };

    // Highlights
    const highlightItems = document.querySelectorAll('.wpb_text_column ul li');
    result.highlights = Array.from(highlightItems).map(li => li.innerText.trim());

    // Overview (first paragraph)
    const overviewEl = document.querySelector('.wpb_text_column p');
    if (overviewEl) {
        result.overview = overviewEl.innerText.trim();
    }

    // Camp Details (key info like age, price, etc.)
    document.querySelectorAll('.camp-information-item').forEach(item => {
        const label = item.querySelector('.camp-information-label') ? .innerText.trim().toLowerCase();
        const value = item.querySelector('.camp-information-value') ? .innerText.trim();

        switch (label) {
            case "age range":
                result.age_range = value;
                break;
            case "availability":
                result.availability = value;
                break;
            case "minimum stay":
                result.minimum_stay = value;
                break;
            case "price":
                result.price = value;
                break;
            case "main language":
                result.main_language = value;
                break;
            case "number of campers":
                result.number_of_campers = value;
                break;
            case "gender":
                result.gender = value;
                break;
            case "bedrooms":
                result.bedrooms = value;
                result.accommodation_and_facilities.type = value;
                break;
        }
    });

    // Activities
    const activitiesHeader = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.includes("Activities"));
    if (activitiesHeader && activitiesHeader.nextElementSibling ? .tagName === "UL") {
        result.activities = Array.from(activitiesHeader.nextElementSibling.querySelectorAll('li')).map(li => li.innerText.trim());
    }

    // Language Lessons (search for paragraph next to "Language Lessons")
    const langLessonsHeader = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.toLowerCase().includes("language lessons"));
    if (langLessonsHeader && langLessonsHeader.nextElementSibling ? .tagName === "P") {
        result.language_lessons = langLessonsHeader.nextElementSibling.innerText.trim();
    }

    // Facilities
    const facilitiesHeader = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.includes("Facilities"));
    if (facilitiesHeader && facilitiesHeader.nextElementSibling ? .tagName === "UL") {
        result.accommodation_and_facilities.facilities = Array.from(facilitiesHeader.nextElementSibling.querySelectorAll('li')).map(li => li.innerText.trim());
    }

    // Output the final structured JSON
    console.log("✅ Extracted JSON:");
    console.log(JSON.stringify(result, null, 2));
})();
