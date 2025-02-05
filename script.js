
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    const savedLang = localStorage.getItem("selectedLanguage") || "vi";
    changeLanguage(savedLang);

    loadComments();
});

document.addEventListener("mousemove", function (event) {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.body.style.setProperty("--x", x + "%");
    document.body.style.setProperty("--y", y + "%");
});

const translations = {
    vi: {
        title: "Làng Nghề Truyền Thống Bến Tre",
        craftTitle: "Danh Sách Các Làng Nghề",
        villages: [
            {
                name: "1. Làng Nghề Kẹo Dừa (Xã Sơn Đông, TP. Bến Tre)",
                formed: "Hình thành từ: Đầu thế kỷ 20.",
                process: "Cách làm: Dừa tươi được nạo cơm, ép lấy nước cốt, nấu với đường và mạch nha.",
                feature: "Đặc trưng: Kẹo dừa dẻo, thơm tự nhiên.",
                meaning: "Ý nghĩa: Thể hiện sự sáng tạo và tận dụng nguồn nguyên liệu sẵn có của người dân."
            },
            {
                name: "2. Làng Nghề Thủ Công Mỹ Nghệ Từ Dừa (Xã Hữu Định, Huyện Châu Thành)",
                formed: "Hình thành từ: Hơn 100 năm trước.",
                process: "Cách làm: Gáo dừa được chạm khắc thành cốc, chén, tượng nghệ thuật.",
                feature: "Đặc trưng: Sản phẩm bền, đẹp.",
                meaning: "Ý nghĩa: Tận dụng tối đa cây dừa, giúp phát triển kinh tế bền vững."
            },
            {
                name: "3. Làng Nghề Dệt Chiếu (Xã Nhơn Thạnh, TP. Bến Tre)",
                formed: "Hình thành từ: Hơn 200 năm.",
                process: "Cách làm: Sử dụng cói và lác để dệt thủ công thành chiếu.",
                feature: "Đặc trưng: Chiếu dệt bền, hoa văn đẹp.",
                meaning: "Ý nghĩa: Gìn giữ nghề truyền thống lâu đời, gắn liền với đời sống người Việt."
            },
            {
                name: "4. Làng Nghề Làm Bánh Tráng (Xã Phú Ngãi, Huyện Ba Tri)",
                formed: "Hình thành từ: Hơn 150 năm.",
                process: "Cách làm: Bột gạo pha nước, tráng mỏng, phơi khô.",
                feature: "Đặc trưng: Bánh tráng thơm, dẻo.",
                meaning: "Ý nghĩa: Đóng góp vào ẩm thực truyền thống, tạo việc làm cho nhiều hộ gia đình."
            },
            {
                name: "5. Làng Nghề Đan Lát (Xã An Thạnh, Huyện Mỏ Cày Nam)",
                formed: "Hình thành từ: Hơn 100 năm.",
                process: "Cách làm: Sử dụng tre, trúc để đan thành rổ, rá, giỏ.",
                feature: "Đặc trưng: Sản phẩm chắc chắn, đẹp.",
                meaning: "Ý nghĩa: Tận dụng nguyên liệu tự nhiên, giúp bảo vệ môi trường."
            }
        ],
        comments: "Bình luận",
        sendMessage: "Gửi",
        contact: "Liên hệ",
        zalo: "Nhắn tin Zalo"
    },
    en: {
        title: "Ben Tre Traditional Craft Villages",
        craftTitle: "List of Craft Villages",
        villages: [
            {
                name: "1. Coconut Candy Village (Son Dong, Ben Tre City)",
                formed: "Established: Early 20th century.",
                process: "Process: Fresh coconut is grated, squeezed for milk, and cooked with sugar and malt.",
                feature: "Feature: Soft, naturally fragrant coconut candy.",
                meaning: "Significance: Represents creativity and the utilization of local resources."
            },
            {
                name: "2. Coconut Handicraft Village (Huu Dinh, Chau Thanh District)",
                formed: "Established: Over 100 years ago.",
                process: "Process: Coconut shells are carved into cups, bowls, and artistic statues.",
                feature: "Feature: Durable and beautiful products.",
                meaning: "Significance: Maximizes the use of coconut trees, promoting sustainable economic growth."
            },
            {
                name: "3. Mat Weaving Village (Nhon Thanh, Ben Tre City)",
                formed: "Established: Over 200 years ago.",
                process: "Process: Reed and rush are woven into traditional mats.",
                feature: "Feature: Durable mats with beautiful patterns.",
                meaning: "Significance: Preserves a long-standing craft deeply connected to Vietnamese culture."
            },
            {
                name: "4. Rice Paper Village (Phu Ngai, Ba Tri District)",
                formed: "Established: Over 150 years ago.",
                process: "Process: Rice flour is mixed with water, spread thinly, and dried.",
                feature: "Feature: Fragrant and chewy rice paper.",
                meaning: "Significance: Contributes to traditional Vietnamese cuisine and provides jobs for many families."
            },
            {
                name: "5. Bamboo Weaving Village (An Thanh, Mo Cay Nam District)",
                formed: "Established: Over 100 years ago.",
                process: "Process: Bamboo and rattan are woven into baskets, trays, and bags.",
                feature: "Feature: Strong and aesthetically pleasing products.",
                meaning: "Significance: Utilizes natural materials and promotes environmental sustainability."
            }
        ],
        comments: "Comments",
        sendMessage: "Send",
        contact: "Contact",
        zalo: "Message on Zalo"
    }
};

function changeLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);
    document.getElementById("page-title").textContent = translations[lang].title;
    document.querySelector("#craft-villages h2").textContent = translations[lang].craftTitle;
    document.querySelector("#comments h2").textContent = translations[lang].comments;
    document.querySelector("#contact h2").textContent = translations[lang].contact;
    document.querySelector(".zalo-button").textContent = translations[lang].zalo;
    document.querySelector("#chatbox button").textContent = translations[lang].sendMessage;

    let villageItems = document.querySelectorAll(".village-item");
    translations[lang].villages.forEach((village, index) => {
        if (villageItems[index]) {
            villageItems[index].querySelector("h3").textContent = village.name;
            villageItems[index].querySelectorAll("p")[0].textContent = village.formed;
            villageItems[index].querySelectorAll("p")[1].textContent = village.process;
            villageItems[index].querySelectorAll("p")[2].textContent = village.feature;
            villageItems[index].querySelectorAll("p")[3].textContent = village.meaning;
        }
    });
}

function sendMessage() {
    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();

    if (username === "" || message === "") {
        alert("Vui lòng nhập tên và nội dung bình luận!");
        return;
    }

    let chatbox = document.getElementById("messages");

    let newComment = document.createElement("div");
    newComment.classList.add("comment-item");
    newComment.innerHTML = `<strong>${username}:</strong> ${message}`;

    chatbox.appendChild(newComment);

    saveComment(username, message);

    document.getElementById("username").value = "";
    document.getElementById("message").value = "";
}

function saveComment(username, message) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ username, message });
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
    let chatbox = document.getElementById("messages");
    chatbox.innerHTML = "";
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach(comment => {
        let newComment = document.createElement("div");
        newComment.classList.add("comment-item");
        newComment.innerHTML = `<strong>${comment.username}:</strong> ${comment.message}`;
        chatbox.appendChild(newComment);
    });
}
