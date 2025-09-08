document.addEventListener('DOMContentLoaded', function() {
    // --- CÁC THÀNH PHẦN DOM CHÍNH ---
    const galaxy = document.getElementById('galaxy');
    const bodyEl = document.body;
    const audio = document.getElementById('bg-music');
    const overlay = document.getElementById('music-overlay');
    const songTitleEl = document.getElementById('song-title');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const favoriteBtn = document.getElementById('favorite-btn');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const loadingScreen = document.getElementById('loading-screen');
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const volumeSlider = document.getElementById('volume-slider');
    const gyroToggle = document.getElementById('gyro-toggle');
    const waveformContainer = document.getElementById('waveform');
    const waveformControls = document.getElementById('waveform-controls');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // =================================================================
    // ★★★ CẤU HÌNH CÁ NHÂN ★★★
    // =================================================================
    const birthdayData = {
        day: 9, month: 6,
        letter: { title: "Gửi em, cô gái tuyệt vời nhất từng được sinh ra =))) nghe hơi sến tí nhưng mà thôi kệ di hehee", content: `<p>Hôm nay là ngày sinh nhật của em, là ngày mà mẹ em đã sinh ra em =))) anh biết nhưng mà ý là kiểu ngày mà mẹ em đẻ ra thiên thần luôn rồi ấy kiểu em tuyệt vời mà xinh xắn lại còn giỏi giang nữa omg</p><p> Có lẽ nếu xét về tình cảm dành cho em chắc anh thua mỗi mẹ em thôi ấy, anh yêu em nhiều lắm luôn í. Thôi anh nhắn v th tại anh viết thư tay cho em rồi mà =)) đọc thư tay nó mới tình cảm hơn chứ <p>Chúc em sinh nhật vui vẻ!</p></p>` },
        song: { file: "https://treuah.netlify.app/ordinary.mp3", title: "Ordinary - Alex Warren" }
    };
    const mainPlaylist = [
        { file: "https://treuah.netlify.app/leduong.mp3", title: "Lễ đường - Kai Đinh" }, 
        { file: "https://treuah.netlify.app/dieforyou.mp3", title: "Die For You - The Weeknd" },
        { file: "https://treuah.netlify.app/ordinary.mp3", title: "Ordinary - Alex Warren" },
        { file: "https://treuah.netlify.app/supernatural.mp3", title: "supernatural - Ariana Grande" },
        { file: "https://treuah.netlify.app/youngandbeautiful.mp3", title: "Young and Beautiful - Lana Del Rey" },
        { file: "https://treuah.netlify.app/tumblrgirls.mp3", title: "Tumblr Girls - G-Eazy" },
        { file: "https://treuah.netlify.app/sayyeslocopunch.mp3", title: "Say Yes - Loco x Punch" },
        { file: "https://treuah.netlify.app/carryyouhome.mp3", title: "Carry You Home - Alex Warren" },
        { file: "https://treuah.netlify.app/prada.mp3", title: "Prada - Cassö x Raye x D Block Europe" },
        { file: "https://treuah.netlify.app/phepmau.mp3", title: "Phép Màu - MAYDAYs ft.Minh Tốc" },
        { file: "https://treuah.netlify.app/paris.mp3", title: "Paris - The Chainsmokers" },
        { file: "https://treuah.netlify.app/wefoundlove.mp3", title: "We Found Love - Rihanna ft.Calvin Harris" },
        { file: "https://treuah.netlify.app/daylight.mp3", title: "Day Light - Taylor Swift" },
        { file: "https://treuah.netlify.app/angelnumbers.mp3", title: "Angel Numbers / Ten Toes - Chris Brown" },
        { file: "https://treuah.netlify.app/oneofthegirls.mp3", title: "One Of The Girls - The Weeknd, JENNIE, Lily-Rose Depp" },
        { file: "https://treuah.netlify.app/treatyoubetter.mp3", title: "Treat you better - Shawn Mendes " },
        { file: "https://treuah.netlify.app/goodforyou.mp3", title: "Good For You - Selena Gomez" },
        { file: "https://treuah.netlify.app/birdsofafeather.mp3", title: "Birds Of a Feather - Billie Eilish" },
        { file: "https://treuah.netlify.app/ladykillers.mp3", title: "Lady Killers II - G-Eazy" },
        { file: "https://treuah.netlify.app/allthestars.mp3", title: "All The Stars - Kendrick Lamar x SZA" },
    ];
    const dailySongs = [
        { day: 1, song: { file: "https://treuah.netlify.app/main/fever.mp3", title: "Fever - COLDZY" } },
        { day: 2, song: { file: "https://treuah.netlify.app/main/art.mp3", title: "Art - Tyla" } },
        { day: 3, song: { file: "https://treuah.netlify.app/main/nambenanh.mp3", title: "Nằm bên anh - Minh Đinh" } },
        { day: 4, song: { file: "https://treuah.netlify.app/main/Fantasize.mp3", title: "Fantasize - Ariana Grande" } },
        { day: 5, song: { file: "https://treuah.netlify.app/main/stillwithyou.mp3", title: "Still With You - Jung Kook" } },
        { day: 6, song: { file: "https://treuah.netlify.app/main/calloutmyname.mp3", title: "Call Out My Name - The Weeknd" } },
        { day: 7, song: { file: "https://treuah.netlify.app/main/khobaudanhroi.mp3", title: "Kho báu đánh rơi - tlinh" } },
        { day: 8, song: { file: "https://treuah.netlify.app/main/babyonemoretime.mp3", title: "Baby One More Time - Britney Spears" } },
        { day: 9, song: { file: "https://treuah.netlify.app/main/Snooze.mp3", title: "snooze - SZA" } },
        { day: 10, song: { file: "https://treuah.netlify.app/main/earnedit.mp3", title: "Earned It - The Weeknd" } }, 
        { day: 11, song: { file: "https://treuah.netlify.app/main/dearfuturehusband.mp3", title: "Dear Future Husband - Meghan Trainor" } },
        { day: 12, song: { file: "https://treuah.netlify.app/main/luther.mp3", title: "Luther - Kendrick Lamar & SZA" } },
        { day: 13, song: { file: "https://treuah.netlify.app/main/thegioithantien.mp3", title: "Thế giới thần tiên - tlinh" } },
        { day: 14, song: { file: "https://treuah.netlify.app/main/muathamlanggioi.mp3", title: "Mưa thâm lặng giời - BigDaddy ft.GREY D" } },
        { day: 15, song: { file: "https://treuah.netlify.app/main/afterlastnight.mp3", title: "After Last Night - Bruno Mars & Anderson Paak" } },
        { day: 16, song: { file: "https://treuah.netlify.app/main/Saturn.mp3", title: "Saturn - SZA" } },
        { day: 17, song: { file: "https://treuah.netlify.app/main/nuocmatdautheroiduoc.mp3", title: "Nước mắt đâu thể rơi được - 24kRight & tlinh" } },
        { day: 18, song: { file: "https://treuah.netlify.app/main/oldlove.mp3", title: "Old Love - Yuji ft. Putri Dahlia" } },
        { day: 19, song: { file: "https://treuah.netlify.app/main/only.mp3", title: "ONLY - LeeHi" } },
        { day: 20, song: { file: "https://treuah.netlify.app/main/detoiomembanggiaidieunay.mp3", title: "Để tôi ôm em bằng giai điệu này - Kai Dinh x Min x Grey D" } },
        { day: 21, song: { file: "https://treuah.netlify.app/main/lamlanhchuatinh.mp3", title: "Làm lành chữa tình - tlinh" } },
        { day: 22, song: { file: "https://treuah.netlify.app/main/SexyBack.mp3", title: "SexyBack - Justin Timberlake" } },
        { day: 23, song: { file: "https://treuah.netlify.app/main/duaemvenha.mp3", title: "đưa em về nhà - Grey D x Chillies" } },
        { day: 24, song: { file: "https://treuah.netlify.app/main/sayyes.mp3", title: "Say Yes - OgeNus x Pia Linh" } },
        { day: 25, song: { file: "https://treuah.netlify.app/shhhhhhh...mp3", title: "shhhhhhh.. - wean" } },
        { day: 26, song: { file: "https://treuah.netlify.app/main/Water.mp3", title: "Water - Tyla" } },
        { day: 27, song: { file: "https://treuah.netlify.app//main/standingnexttoyou.mp3", title: "Standing Next To You - Jung Kook" } },
        { day: 28, song: { file: "https://treuah.netlify.app/main/chamhoa.mp3", title: "Chăm Hoa - Mono" } },
        { day: 29, song: { file: "https://treuah.netlify.app/main/freakydeaky.mp3", title: "Freaky Deaky - Tyga x Doja Cat" } },
        { day: 30, song: { file: "https://treuah.netlify.app/openarms.mp3", title: "Open Arms - SZA" } },
        { day: 31, song: { file: "https://treuah.netlify.app/main/theboyismine.mp3", title: "The boy is mine - Ariana Grande" } }
    ];

    const dailyLetters = [
        { day: 1, title: "hello cậu, ngày học đầu tiên của tháng kết thúc rồi", content: `<p>Vậy là một ngày nữa ở Thành Đô đã qua. Cậu đã vất vả, mệt mỏi rồi. Mọi thứ hôm nay vẫn ổn chứ? Có điều gì cậu muốn kể cho tớ nghe không?</p><p>Tuy là ở xa, nhưng mà tớ vẫn luôn ở đây lắng nghe cậu. Giờ thì nghỉ ngơi thôi nhé </p>` },
        { day: 2, title: "xin cả chào nhesee, ngày thứ hai của cậu mệt không?", content: `<p>Tan học rồi, chắc cậu mệt lắm. Đừng ôm hết mọi mệt mỏi một mình nhé, hãy chia sẻ với tớ. Tớ không ở cạnh để chăm sóc cậu được, nên chỉ có thể lắng nghe thôi và an ủi cậu thôi.</p><p>Hôm nay của tớ ở Việt Nam cũng hơi mệt mỏi một chút, nhưng mà kiểu có cậu ấy nên cảm giác thoải mái v =)) Có chuyện thì hãy kể tớ nhé, tớ luôn ở đây ❤️</p>` },
        { day: 3, title: "Gửi cậu, ngày thứ ba, lại một ngày nỗ lực rồi", content: `<p>Tớ biết việc học và thích nghi với môi trường mới, các bạn mới không dễ dàng. Tớ tự hào về cậu nhiều lắm. Mỗi ngày trôi qua, cậu lại càng giỏi giang hơn một chút đấy.</p><p>Hôm nay có gì vui hay có gì khiến cậu mệt mỏi, tức giận không? Kể cho tớ nghe, lov u so much luôn</p>` },
        { day: 4, title: "Ngày thứ 4, tớ lại nhớ khoảng khắc đấy =))) dyeu v", content: `<p>Tối nay, tớ lại nghĩ về chiếc huy chương cậu đưa tớ, kiểu nó làm cảm giác như cậu đang ở gần tớ vô cùng luôn ấy =)) cảm giác nhớ cậu v</p><p>Ngày hôm nay của cậu thế nào thế? Việc học có căng thẳng, khó không thế? Cố lên dii, im alws here </p><p> Có chuyện gì hãy nói với tớ nhé </p>` },
        { day: 5, title: "Tan học rồi, gác lại mọi thứ và thư giãn thôi", content: `<p>Một ngày nữa đã qua, cậu đã làm rất tốt rồi. Bây giờ là thời gian để nghỉ ngơi. Cậu đã ăn tối chưa? Nhớ đừng bỏ bữa nhé.</p><p>Tớ hy vọng những dòng chữ này có thể xoa dịu đi phần nào mệt mỏi của cậu. Ngủ thật ngon để mai có nhiều năng lượng nhé.</p>` },
        { day: 6, title: "Gửi cậu, hôm nay là thứ 2 đầu tuần", content: `<p>Tuần mới vui vẻ nhé !!!! Cậu đang làm rất tốt rồi, cố gắng lên. Ngày đầu tuần phải luôn thật vui vẻ nhé để cả tuần mới akelo okela được </p><p>Đầu tuần có chuyện gì không thế? Bị thích nghe cậu kể chuyện ấy =)) Chúc cậu buổi tối vui vẻ and love me 2 =)) </p>` },
        { day: 7, title: "Gửi cậu, tối thứ bảy ở Thành Đô...", content: `<p>Ngày nghỉ đầu tiên của cậu thế nào? Có đi đâu chơi hay khám phá được món gì ngon không? Tớ tò mò về cuộc sống của cậu ở bên đó lắm.</p><p>Dù chúng ta xa nhau, nhưng được nghe cậu kể về một ngày của mình làm tớ cảm thấy khoảng cách như ngắn lại. Chúc cậu ngủ ngon.</p>` },
        { day: 8, title: "helo bae, ê í là cậu yêu vkl =)) ", content: `<p>Thế là đầu tuần cuối cùng ở Việt Nam =))) nghe cứ hụt hẫng tdn ấy cậu ơi nma tớ hy vọng cậu đừng khóc nhé =)) nhớ lời tớ dặn về khóc khi nào rồi đấy =))) .</p><p>Đừng lo lắng quá nhé, Bên cạnh cậu còn gia đình, còn tớ nữa. Tớ luôn tin ở cậu. Mạnh mẽ lên !!! love u so much luôn </p>` },
        { day: 9, title: "Hê và lô cậu =))) ê nma cậu yêu vl ", content: `<p>Hoa đẹp chứ? Ê ý là thấy tone màu đấy hợp cả cậu vl =)) kiểu xinh xinh lại còn dịu dàng nữa omg tuyệt. Cậu alws phải vui vẻ, same cái vibe với bông hoa nhé =)) kiểu là luôn tươi cười, vui vẻ như cách bông hoa nở rộ nhé. Tớ yêu cậu nhiều lắm luôn ý </p>` },
        { day: 10, title: "Gửi cậu, còn 3 ngày nữa là cậu lên đường rùi", content: `<p>Công nhận thời gian trôi nhanh thật =))) mới ngày nào còn mới nói chuyện vậy mà đã chuẩn bị đi rồi huhu không phải buồn 1 chút nữa rồi mà buồn nhiều nhiều chút. Nhưng mà trộm vía mỗi tối được nói chuyện với cậu là kiểu vui vl ấy =))  Love you so so so so so.... much luôn.</p>` },
        { day: 11, title: "Còn 2 ngày nữa, ối giời ơi...", content: `<p>ê sao trôi nhanh thế dcm , nhớ ơi nhớ, nhớ b hà nhiều chút =))) chắc không phải bạn nữa rồi khả năng giờ phải lên wife luôn, chứ yêu quá rồi đấy =)))) Nhớ nhiều nhiều chút =)) ước được bên cạnh suốt ngày =))))))))))))) </p>` },
        { day: 12, title: "Nhanh thật chưa gì còn hơn 20 tiếng nữa...", content: `<p>Cố lên, không buồn tớ vẫn luôn ở đây với cậu mà, cố lên nào, không được khóc nhé. Tớ thương cậu nhiều lắm luôn í, nhớ lời tớ dặn không được khóc khi không có tớ ở bên, mạnh mẽ lên!!!!</p>` },
        { day: 13, title: "Thế là bay rùi, omg sao dcm nhanh thế", content: `<p>Buồn quá, vợ đi rồi buồn vl, không dám nói tại sao không gặp sớm hơn, nhưng mà biết đâu số phận sắp đặt để lần này có thể tiến xa idk =))) but i want to say that  i love u so much, i miss u. Nhưng mà sang đấy phải cố gắng lên nhé, tớ luôn ở bên cạnh cậu mà</p>` },
        { day: 14, title: "Chắc cậu đến rùi nhỉ?", content: `<p>Mới hôm qua còn gặp, mà giờ đã bên nước khác rồi omg sao mà nhanh v trời ơi, ê í là bị buồn í, cảm giác hụt hẫng vl =)) bị nhớ nhiều chút vợ ơi... i miss u so much luôn, sang bên đấy nhớ ăn uống đầy đủ nhé đặc biệt là nhớ phải uống nước đầy đủ nhé tại vợ bị đau dạ dày đấy !!! nhớ nhee, yêu lắm í .</p>` },
        { day: 15, title: "Gửi cậu, giữa tháng rồi này...", content: `<p>Nửa tháng rồi! Mỗi tối đọc thư là một lần tớ cảm thấy chúng ta gần nhau hơn. Đừng ngần ngại kể cho tớ nghe mọi thứ nhé, tớ luôn ở đây. Hôm nay của cậu thế nào?</p>` },
        { day: 16, title: "Gửi cậu, tối thứ Bảy an lành", content: `<p>Ngày nghỉ thứ Bảy của cậu trôi qua vui vẻ chứ? Có khám phá được điều gì mới mẻ không? Kể tớ nghe với, tớ muốn được nhìn Thành Đô qua lời kể của cậu.</p>` },
        { day: 17, title: "Gửi cậu, tối Chủ nhật, sẵn sàng cho tuần mới", content: `<p>Hy vọng cậu đã có một cuối tuần thật ý nghĩa. Giờ thì sạc đầy pin và chuẩn bị cho tuần mới nhé. Đừng lo, dù tuần mới có thế nào thì tối nào cũng có tớ ở đây đợi cậu. Ngủ ngon.</p>` },
        { day: 18, title: "Gửi cậu, ngày thứ mười tám...", content: `<p>Tuần mới bắt đầu rồi. Cậu đã vất vả cả ngày hôm nay. Giờ thì gác lại mọi lo toan và nghỉ ngơi thôi. Có điều gì khiến cậu bận tâm không?</p>` },
        { day: 19, title: "Gửi cậu, ngày thứ mười chín...", content: `<p>Tớ thích nghe giọng cậu, nhưng tớ cũng thích đọc những dòng tin nhắn cậu kể về một ngày của mình. Cảm giác rất bình yên. Hôm nay của cậu thế nào? Ổn cả chứ?</p>` },
        { day: 20, title: "Gửi cậu, ngày thứ hai mươi...", content: `<p>Hai mươi ngày rồi, thời gian trôi nhanh thật. Chắc hẳn việc học đôi khi cũng áp lực. Nhớ rằng cậu không bao giờ một mình nhé, luôn có tớ ở đây. Nghỉ ngơi thôi. Ngủ ngon nhé.</p>` },
        { day: 21, title: "Gửi cậu, ngày thứ hai mươi mốt...", content: `<p>Hôm nay cậu có cười nhiều không? Tớ hy vọng là có. Niềm vui của cậu cũng là niềm vui của tớ đó. Giờ thì nghỉ ngơi và mơ những giấc mơ thật đẹp nhé.</p>` },
        { day: 22, title: "Gửi cậu, ngày thứ hai mươi hai...", content: `<p>Lại sắp hết một tuần nữa rồi. Cậu đã làm việc rất chăm chỉ. Hãy tự hào về bản thân nhé. Tớ cũng tự hào về cậu. Chúc cậu một buổi tối thật thư giãn.</p>` },
        { day: 23, title: "Gửi cậu, ngày thứ hai mươi ba...", content: `<p>Hôm nay ở Việt Nam trời mưa, tớ lại nghĩ không biết ở Thành Đô thời tiết thế nào, cậu có mang đủ áo ấm không. Lo cho cậu quá. Hôm nay của cậu ổn chứ?</p>` },
        { day: 24, title: "Gửi cậu, tối Chủ nhật cuối cùng của tháng", content: `<p>Một ngày nghỉ nữa lại sắp qua. Hy vọng cậu đã có một ngày thật vui. Hãy ngủ một giấc thật sâu để tuần cuối cùng của tháng thật bùng nổ nhé. Ngủ ngon.</p>` },
        { day: 25, title: "Gửi cậu, ngày thứ hai mươi lăm...", content: `<p>Tuần cuối cùng của tháng rồi. Chắc hẳn cũng có nhiều bài vở cần hoàn thành. Cứ từ từ làm nhé, đừng vội. Mệt thì nghỉ, và nhớ là có tớ ở đây. Thương cậu.</p>` },
        { day: 26, title: "Gửi cậu, ngày thứ hai mươi sáu...", content: `<p>Tớ vừa xem ảnh Thành Đô trên mạng và tự hỏi không biết cậu đang ở góc nào của thành phố đó. Mong đến ngày tớ có thể đến đó cùng cậu. Hôm nay cậu đã vất vả rồi. Ngủ ngon nhé.</p>` },
        { day: 27, title: "Gửi cậu, ngày thứ hai mươi bảy...", content: `<p>Cảm ơn cậu vì đã luôn là một cô gái kiên cường. Yêu xa cần rất nhiều nỗ lực, và cậu đang làm rất tốt phần của mình. Tớ trân trọng điều đó lắm. Chúc cậu ngủ ngon.</p>` },
        { day: 28, title: "Gửi cậu, ngày thứ hai mươi tám...", content: `<p>Chỉ còn vài ngày nữa là hết tháng. Nhìn lại một tháng qua, cậu thấy mình đã trưởng thành hơn nhiều không? Với tớ, một tháng qua tớ thấy mình thương cậu nhiều hơn. Nghỉ ngơi đi nhé.</p>` },
        { day: 29, title: "Gửi cậu, ngày thứ hai mươi chín...", content: `<p>Hôm nay có điều gì làm cậu vui nhất? Kể cho tớ nghe đi, tớ muốn được vui cùng cậu. Sau một ngày dài, hãy để tâm trí được nghỉ ngơi nhé. Chúc cậu mơ đẹp.</p>` },
        { day: 30, title: "Gửi cậu, tối ngày áp chót của tháng", content: `<p>Ngày mai là hết tháng rồi. Cảm ơn cậu vì đã để tớ đồng hành trong suốt một tháng vừa qua. Mỗi tối nói chuyện với cậu đều là một điều quý giá. Hôm nay cậu đã làm rất tốt. Ngủ ngon nhé.</p>` },
        { day: 31, title: "Gửi cậu, khép lại một tháng xa nhau", content: `<p>Tháng 10 kết thúc rồi. Một tháng qua cậu đã rất kiên cường và giỏi giang. Tớ tự hào về cậu lắm. Cảm ơn vì đã luôn chia sẻ cùng tớ dù chúng ta ở xa. Cùng nhau chào đón tháng 11 nhé. Ngủ thật ngon, cô gái của tớ.</p>` },
    ];

    const daytimeLetters = [
        { day: 1, title: "Gửi cậu, ngày đầu tháng tốt lành nhé!", content: `<p>Bắt đầu tháng mới ở Thành Đô, chúc cậu mọi việc đều suôn sẻ. Tớ gửi một chút năng lượng từ Việt Nam qua cho cậu đây. Cố lên nhé!</p>` },
        { day: 2, title: "Gửi cậu, ngày thứ hai...", content: `<p>Chúc cậu một ngày học tập hiệu quả. Đừng quên uống đủ nước và cười thật tươi nha. Tối mình nói chuyện sau.</p>` },
        { day: 3, title: "Gửi cậu, ngày thứ ba...", content: `<p>Hôm nay cậu có môn gì khó không? Cứ bình tĩnh xử lý từng chút một nhé, tớ tin cậu làm được. Fighting!</p>` },
        { day: 4, title: "Gửi cậu, ngày thứ tư...", content: `<p>Chỉ là một lời nhắn nhỏ để nói rằng, tớ đang nghĩ đến cậu. Chúc cậu một ngày học vui vẻ!</p>` },
        { day: 5, title: "Gửi cậu, ngày thứ năm...", content: `<p>Cố lên sắp cuối tuần rồi! Mong cậu có một ngày thật nhiều năng lượng và niềm vui. Đừng để bị áp lực quá nhé.</p>` },
        { day: 6, title: "Gửi cậu, ngày thứ sáu trong tháng...", content: `<p>Ngày cuối cùng trong tuần học rồi, cố gắng nốt hôm nay nhé. Tớ ở đây đợi cậu "tan học" nè. Have a good day!</p>` },
        { day: 7, title: "Gửi cậu, ngày thứ bảy...", content: `<p>Cuối tuần rồi! Hôm nay cậu có dự định gì đặc biệt không? Dù làm gì cũng hãy thật vui nhé. Nhớ giữ gìn sức khỏe.</p>` },
        { day: 8, title: "Ê thứ 2 cuối cùng rồi đấy =)) í là t2 cuối ở đây =)) ", content: `<p>Chúc cậu một thứ hai vui vẻ và luôn là kiểu happy, và hehehe luôn có tớ bên cạnh cậu nhaa alws luôn. Tạm gác lại sách vở và yes chuẩn bị thôi nào =)) í là cái thư này cũng cũng bình thường thôi =))) nói lời vẫn cứ akelo hơn =)) </p>` },
        { day: 9, title: "Thứ 3 CUỐI rồi omg nhanh vkl ", content: `<p>Tuần cuối rồi, chúc cậu sang bên đấy mạnh khỏe và cố gắng học hành tốt nhé =)) mặc dù chưa đi đâu nma th kệ di cứ chúc. Cố lên cô gái của tớ =))) </p>` },
        { day: 10, title: "Gửi cậu, ngày giữa tuần cuối ở đây...", content: `<p>dcm sao nhanh thế kbt omg ê nhớ cậu qs đấy buồn vkl sắp di rồi kìa huhuhuhuhuhu buồn nhiều chút nha, nma ksao vẫn còn cậu bên cạnh tớ mà hehehe love u sm</p>` },
        { day: 11, title: "Gửi cậu, ngày thứ mười một...", content: `<p>Nếu giờ giải lao có mệt, hãy nghe một bản nhạc vui vẻ xem sao. Chúc cậu một ngày học hiệu quả!</p>` },
        { day: 12, title: "Gửi cậu, ngày thứ mười hai...", content: `<p>Giữa tuần rồi, cố lên nhé. Chỉ một lời nhắn để cậu biết là có người luôn nghĩ về cậu thôi. ^^</p>` },
        { day: 13, title: "Gửi cậu, ngày thứ mười ba...", content: `<p>Hôm nay học hành có thuận lợi không? Tớ tin là có. Chúc cậu một ngày tràn đầy tự tin!</p>` },
        { day: 14, title: "Gửi cậu, ngày thứ mười bốn...", content: `<p>Hai tuần rồi đó! Cố gắng nốt hôm nay rồi mai lại cuối tuần. Fighting!</p>` },
        { day: 15, title: "Gửi cậu, ngày giữa tháng!", content: `<p>Nhanh thật, đã nửa tháng rồi. Chúc cậu một ngày học tập hiệu quả. Nhớ cậu!</p>` },
        { day: 16, title: "Gửi cậu, ngày thứ mười sáu...", content: `<p>Cuối tuần của cậu thế nào? Kể tớ nghe vào tối nay nhé. Giờ thì chúc cậu một ngày thứ Bảy thật vui.</p>` },
        { day: 17, title: "Gửi cậu, ngày chủ nhật an lành", content: `<p>Hôm nay hãy cho phép bản thân được "lười" một chút nhé. Nạp thật nhiều năng lượng cho tuần mới nha cậu.</p>` },
        { day: 18, title: "Gửi cậu, ngày thứ mười tám...", content: `<p>Lại một tuần mới bắt đầu. Chúc cậu mọi sự hanh thông. Nhớ ăn trưa đúng bữa đó!</p>` },
        { day: 19, title: "Gửi cậu, ngày thứ mười chín...", content: `<p>Một lời nhắn nhỏ nhắc cậu đừng ngồi học lâu quá, thỉnh thoảng đứng dậy vươn vai một chút nhé. Tớ lo cho cậu đó.</p>` },
        { day: 20, title: "Gửi cậu, ngày thứ hai mươi...", content: `<p>2/3 chặng đường của tháng rồi. Cậu giỏi lắm. Chúc cậu một ngày học nhẹ nhàng.</p>` },
        { day: 21, title: "Gửi cậu, ngày thứ hai mươi mốt...", content: `<p>Chỉ muốn ghé qua đây và để lại một nụ cười cho cậu. :) Cố lên nhé!</p>` },
        { day: 22, title: "Gửi cậu, ngày thứ hai mươi hai...", content: `<p>Sắp cuối tháng rồi, thời gian bay nhanh thật. Chúc cậu ngày mới tốt lành. Tối mình gặp nhau qua màn hình nhé.</p>` },
        { day: 23, title: "Gửi cậu, ngày thứ hai mươi ba...", content: `<p>Hôm nay tớ... (kể một hoạt động ngắn của cậu). Còn cậu thì sao? Chúc cậu một ngày học vui vẻ, không áp lực.</p>` },
        { day: 24, title: "Gửi cậu, ngày thứ hai mươi bốn...", content: `<p>Chủ nhật vui vẻ nhé cậu. Hôm nay hãy làm điều gì đó khiến cậu thực sự hạnh phúc!</p>` },
        { day: 25, title: "Gửi cậu, ngày thứ hai mươi lăm...", content: `<p>Tuần cuối cùng của tháng rồi! Cố gắng lên nhé. Chúc cậu một ngày học thật hiệu quả để cuối tuần đi chơi.</p>` },
        { day: 26, title: "Gửi cậu, ngày thứ hai mươi sáu...", content: `<p>Thời tiết bên đó có lạnh không? Nhớ mặc đủ ấm nhé. Chúc cậu một ngày học tập ấm áp.</p>` },
        { day: 27, title: "Gửi cậu, ngày thứ hai mươi bảy...", content: `<p>Một lời nhắn gửi thật nhiều động lực cho cậu. Cậu là giỏi nhất! ^^</p>` },
        { day: 28, title: "Gửi cậu, ngày thứ hai mươi tám...", content: `<p>Đếm ngược những ngày cuối tháng. Cố lên nhé. Tớ luôn ở đây ủng hộ cậu.</p>` },
        { day: 29, title: "Gửi cậu, ngày thứ hai mươi chín...", content: `<p>Hôm nay có bài kiểm tra nào không? Chúc cậu làm bài thật tốt. Tự tin lên nhé!</p>` },
        { day: 30, title: "Gửi cậu, ngày áp chót của tháng", content: `<p>Ngày 30 rồi! Chúc cậu một ngày học nhẹ nhàng để chuẩn bị khép lại một tháng thật đẹp.</p>` },
        { day: 31, title: "Gửi cậu, ngày cuối cùng của tháng...", content: `<p>Chúc cậu một ngày học cuối tháng thật thành công để khép lại một tháng trọn vẹn nhé. Tối mình nói chuyện.</p>` },
    ];

    // --- BIẾN TRẠNG THÁI ---
    let upNextPlaylist = []; let upNextIndex = 0;
    const messages = ["U are the best", "Cố lên !!!", "Yêu cậu", "Love u so much", "nhớ cậu nhiều", "tớ luôn bên cạnh cậu", "💖", "💕", "🌟", "✨", "You're my angel", "Đừng bỏ cuộc nhé !!!", "I'm alws here", "😘", "🥰", "❤️", "💘", "💝", "💞"];
    const heartSymbols = ["♥", "💖", "💕", "🌟", "✨"];
    const shootingStarMessages = [
        "Anh bắt được em rồi nhé!", "Một điều ước cho em <3", "Yêu em!", "You're my star",
        "✨❤️✨", "Luôn ở đây vì em"
    ];
    const textStyles = ['love', 'date', 'special'];
    let rotationX = 0, rotationY = 0, scale = 1;
    let isDragging = false, lastMouseX = 0, lastMouseY = 0;
    const activeParticles = new Set(); 
    const config = { isMobile: false, isSmallMobile: false, maxParticles: 200, starCount: 500, particleInterval: 100 };
    let initialOrientation = null; let lastKnownOrientation = { beta: 0, gamma: 0 }; const GYRO_SENSITIVITY = 0.5;
    let isBirthdayMode = false; let isLetterModeActive = false; let typingInterval = null; let gyroEnabled = true;
    let wavesurfer;

    // --- CÁC HÀM TIỆN ÍCH ---
    function shuffleArray(array) { let currentIndex = array.length, randomIndex; while (currentIndex != 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; }
    function debounce(func, delay) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); }; }
    function setupResponsiveValues() { const width = window.innerWidth; config.isMobile = width <= 768; config.isSmallMobile = width <= 480; if (config.isSmallMobile) { config.maxParticles = 120; config.starCount = 250; config.particleInterval = 150; } else if (config.isMobile) { config.maxParticles = 150; config.starCount = 350; config.particleInterval = 120; } else { config.maxParticles = 200; config.starCount = 500; config.particleInterval = 100; } }
    const handleResize = debounce(() => { setupResponsiveValues(); createStars();  adjustLetterButtonPosition(); }, 250);
    function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; }
    
    // --- CÁC HÀM TẠO HIỆU ỨNG ---

    function typewriterEffect(elementsToType, onComplete = () => {}) {
    let currentElementIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    const TYPING_SPEED = 35; // Tốc độ gõ (ms giữa các ký tự)
    const PAUSE_BETWEEN_ELEMENTS = 500; // Thời gian nghỉ giữa các đoạn

    if (typingInterval) clearInterval(typingInterval);

    function startTypingNextElement() {
        if (currentElementIndex >= elementsToType.length) {
            isTyping = false;
            onComplete();
            return;
        }
        
        currentCharIndex = 0;
        const currentElement = elementsToType[currentElementIndex].element;
        
        // Ẩn element và đặt nó ở vị trí sẵn sàng để slide down
        currentElement.style.opacity = '0';
        currentElement.style.transform = 'translateY(-20px)';
        currentElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        currentElement.innerHTML = ''; 
        
        // Hiện element với animation slide down
        setTimeout(() => {
            currentElement.style.opacity = '1';
            currentElement.style.transform = 'translateY(0)';
        }, 50);
        
        // Bắt đầu gõ từng ký tự
        setTimeout(() => {
            type();
        }, 200);
    }

    const type = () => {
        if (!isTyping) return;
        
        const currentItem = elementsToType[currentElementIndex];
        const fullText = currentItem.text;
        const currentElement = currentItem.element;
        
        // Nếu đã gõ hết đoạn hiện tại
        if (currentCharIndex >= fullText.length) {
            // Xóa con trỏ ở cuối dòng
            currentElement.innerHTML = currentElement.innerHTML.replace(/<span class="typing-cursor"><\/span>$/, '');
            currentElementIndex++;
            setTimeout(startTypingNextElement, PAUSE_BETWEEN_ELEMENTS);
            return;
        }

        const char = fullText.charAt(currentCharIndex);
        const cursorSpan = '<span class="typing-cursor"></span>';
        
        // Xử lý thẻ HTML - nếu gặp '<' thì lấy toàn bộ thẻ
        if (char === '<') {
            const closingIndex = fullText.indexOf('>', currentCharIndex);
            if (closingIndex !== -1) {
                const htmlTag = fullText.substring(currentCharIndex, closingIndex + 1);
                const currentHTML = currentElement.innerHTML.replace(/<span class="typing-cursor"><\/span>$/, '');
                currentElement.innerHTML = currentHTML + htmlTag + cursorSpan;
                currentCharIndex = closingIndex + 1;
                // Gõ thẻ HTML ngay lập tức
                typingInterval = setTimeout(type, 0);
                return;
            }
        }
        
        // Tạo span với animation fade-in cho ký tự mới
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.opacity = '0';
        charSpan.style.display = 'inline';
        charSpan.style.transition = 'opacity 0.15s ease';
        
        // Xóa con trỏ cũ
        const currentHTML = currentElement.innerHTML.replace(/<span class="typing-cursor"><\/span>$/, '');
        currentElement.innerHTML = currentHTML;
        
        // Thêm ký tự mới với animation
        currentElement.appendChild(charSpan);
        currentElement.insertAdjacentHTML('beforeend', cursorSpan);
        
        // Trigger fade-in animation
        setTimeout(() => {
            charSpan.style.opacity = '1';
        }, 10);
        
        currentCharIndex++;
        
        // Điều chỉnh tốc độ cho các ký tự đặc biệt
        let nextDelay = TYPING_SPEED;
        if (char === '.') nextDelay = TYPING_SPEED * 4; // Dừng lâu hơn sau dấu chấm
        if (char === ',') nextDelay = TYPING_SPEED * 2.5; // Dừng hơi lâu sau dấu phẩy
        if (char === ' ') nextDelay = TYPING_SPEED * 0.7; // Gõ nhanh hơn cho dấu cách
        if (char === '!') nextDelay = TYPING_SPEED * 3; // Dừng sau dấu chấm than
        if (char === '?') nextDelay = TYPING_SPEED * 3; // Dừng sau dấu hỏi
        if (char === '\n') nextDelay = TYPING_SPEED * 2; // Dừng khi xuống dòng
        
        typingInterval = setTimeout(type, nextDelay);
    };

    const skipTyping = () => {
        if (!isTyping) return;
        clearTimeout(typingInterval);
        isTyping = false;
        
        // Hiện tất cả elements với animation nhanh
        elementsToType.forEach((item, index) => {
            const element = item.element;
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
            element.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            element.innerHTML = item.text;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100); // Stagger effect khi skip
        });
        
        setTimeout(onComplete, elementsToType.length * 100 + 200);
    };
    
    // Gán sự kiện skip
    const letterContainer = document.getElementById('letter-container');
    const skipHandler = () => skipTyping();
    letterContainer.addEventListener('click', skipHandler, { once: true });
    
    const closeBtn = document.querySelector('#close-letter-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            letterContainer.removeEventListener('click', skipHandler);
        }, { once: true });
    }

    // Khởi tạo: ẩn tất cả elements trước
    elementsToType.forEach(item => {
        item.element.style.opacity = '0';
        item.element.style.transform = 'translateY(-20px)';
        item.element.innerHTML = '';
    });

    startTypingNextElement();
}
    function createTextParticle() {
        const messagesToUse = isBirthdayMode ? ["Chúc mừng sinh nhật!", "🎂", "🎉"] : messages;
        if (activeParticles.size >= config.maxParticles) return;
        const isHeart = isBirthdayMode ? Math.random() > 0.5 : Math.random() > 0.7;
        const particle = document.createElement('div');
        if (isHeart) {
            particle.className = 'text-particle heart';
            particle.textContent = isBirthdayMode ? getRandomItem(["🎉", "🎂", "💖"]) : getRandomItem(heartSymbols);
        } else {
            const message = getRandomItem(messagesToUse);
            particle.className = `text-particle ${getRandomItem(textStyles)}`;
            particle.textContent = message;
        }
        const xPos = Math.random() * 100;
        const zPos = (Math.random() - 0.5) * (config.isMobile ? 300 : 500);
        const duration = Math.random() * 2 + (config.isMobile ? 3 : 3);
        particle.style.left = `${xPos}%`;
        const size = config.isSmallMobile ? 8 : config.isMobile ? 10 : 12;
        const variation = config.isSmallMobile ? 4 : config.isMobile ? 5 : 6;
        particle.style.fontSize = `${Math.random() * variation + size}px`;
        const startY = -150;
        const endY = window.innerHeight + 150;
        galaxy.appendChild(particle);
        activeParticles.add(particle);

        const handleInteractionStart = () => { particle.classList.add('interactive'); };
        const handleInteractionEnd = () => { particle.classList.remove('interactive'); };
        
        particle.addEventListener('mouseover', handleInteractionStart);
        particle.addEventListener('mouseout', handleInteractionEnd);
        particle.addEventListener('touchstart', handleInteractionStart, { passive: true });
        particle.addEventListener('touchend', handleInteractionEnd);

        const animation = particle.animate([
            { transform: `translate3d(0, ${startY}px, ${zPos}px)`, opacity: 0 },
            { opacity: 0.8, offset: 0.05 }, { opacity: 0.8, offset: 0.95 },
            { transform: `translate3d(0, ${endY}px, ${zPos}px)`, opacity: 0 }
        ], { duration: duration * 1000, easing: 'linear' });
        animation.onfinish = () => { particle.remove(); activeParticles.delete(particle); };
    }

    function createStars() { galaxy.innerHTML = ''; for (let i = 0; i < config.starCount; i++) { const star = document.createElement('div'); star.className = 'star'; const size = Math.random() * 1.5 + 0.5; star.style.width = `${size}px`; star.style.height = `${size}px`; star.style.opacity = Math.random() * 0.5 + 0.3; const angle = Math.random() * Math.PI * 10; const radius = Math.random() * (config.isMobile ? 800 : 1500) + (config.isMobile ? 200 : 300); const yOffset = (Math.random() - 0.5) * (config.isMobile ? 1000 : 2000); const x = Math.cos(angle) * radius; const y = Math.sin(angle) * (config.isMobile ? 100 : 150) + yOffset; const z = Math.sin(angle) * radius * 0.5; star.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`; star.style.animationDelay = `${Math.random() * 3}s`; galaxy.appendChild(star); } }
    
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        document.body.appendChild(star);
        const startX = Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25;
        const startY = Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25;
        const angle = Math.random() * 360;
        const distance = window.innerWidth * 1.2;
        const endX = startX + Math.cos(angle * Math.PI / 180) * distance;
        const endY = startY + Math.sin(angle * Math.PI / 180) * distance;
        const duration = Math.random() * 3000 + 2000;
        star.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
        const animation = star.animate([
            { transform: `translate(${startX}px, ${startY}px) rotate(${angle}deg)`, opacity: 0 },
            { opacity: 1, offset: 0.1 }, { opacity: 0, offset: 0.9 },
            { transform: `translate(${endX}px, ${endY}px) rotate(${angle}deg)`, opacity: 0 }
        ], { duration: duration, easing: 'linear' });

        const onStarCaught = (e) => {
            e.stopPropagation();
            const messageEl = document.createElement('div');
            messageEl.className = 'star-message';
            messageEl.textContent = getRandomItem(shootingStarMessages);
            messageEl.style.left = `${e.clientX}px`;
            messageEl.style.top = `${e.clientY}px`;
            document.body.appendChild(messageEl);
            setTimeout(() => { messageEl.remove(); }, 2500);
            animation.cancel();
            star.remove();
        };
        star.addEventListener('click', onStarCaught, { once: true });
        animation.onfinish = () => star.remove();
    }

    function createStarburst(x, y) { const count = 15; for (let i = 0; i < count; i++) { const p = document.createElement('div'); p.className = 'starburst-particle'; p.style.left = `${x}px`; p.style.top = `${y}px`; document.body.appendChild(p); const angle = Math.random() * Math.PI * 2; const radius = Math.random() * 50 + 20; const finalX = Math.cos(angle) * radius; const finalY = Math.sin(angle) * radius; const duration = 500 + Math.random() * 500; const anim = p.animate([ { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) scale(0)`, opacity: 0 } ], { duration: duration, easing: 'ease-out' }); anim.onfinish = () => p.remove(); } }
    function triggerConfetti() { const count = 150; const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800']; for (let i = 0; i < count; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + 'vw'; c.style.top = -20 + 'px'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; c.style.animationDelay = Math.random() * 3 + 's'; c.style.transform = `scale(${Math.random() * 0.8 + 0.5})`; document.body.appendChild(c); } }
    
    // --- CÁC HÀM ĐIỀU KHIỂN VÀ CẬP NHẬT ---
    function updateSkyColor() { const hour = new Date().getHours(); let gradient = ''; if (hour >= 5 && hour < 8) { gradient = 'radial-gradient(ellipse at bottom, #ff9966, #ff5e62)'; } else if (hour >= 18 && hour < 21) { gradient = 'radial-gradient(ellipse at bottom, #141e30, #243b55)'; } else if (hour >= 21 || hour < 5) { gradient = 'radial-gradient(ellipse at bottom, #090a0f, #10141c)'; } bodyEl.style.setProperty('--sky-gradient', gradient); }
    function updateGalaxyTransform() { rotationX = Math.max(-90, Math.min(90, rotationX)); galaxy.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`; const nearFactor = 0.2, midFactor = 0.1, farFactor = 0.05; bodyEl.style.setProperty('--parallax-transform-near', `translateY(${-rotationX * nearFactor}px) translateX(${rotationY * nearFactor}px)`); bodyEl.style.setProperty('--parallax-transform-mid', `translateY(${-rotationX * midFactor}px) translateX(${rotationY * midFactor}px)`); bodyEl.style.setProperty('--parallax-transform-far', `translateY(${-rotationX * farFactor}px) translateX(${rotationY * farFactor}px)`); }
    function handleDragMove(x, y) { if (!isDragging) return; const deltaX = x - lastMouseX; const deltaY = y - lastMouseY; rotationY += deltaX * 0.5; rotationX -= deltaY * 0.5; updateGalaxyTransform(); lastMouseX = x; lastMouseY = y; }
    function handleOrientation(event) { if (!gyroEnabled) return; lastKnownOrientation.beta = event.beta; lastKnownOrientation.gamma = event.gamma; if (isDragging) return; if (!initialOrientation) { initialOrientation = { beta: event.beta, gamma: event.gamma }; } const deltaBeta = event.beta - initialOrientation.beta; const deltaGamma = event.gamma - initialOrientation.gamma; rotationX = deltaBeta * GYRO_SENSITIVITY; rotationY = deltaGamma * GYRO_SENSITIVITY; updateGalaxyTransform(); }

    // --- CÁC HÀM ÂM NHẠC ---
    function playTrack(track) { if (!wavesurfer) { wavesurfer = WaveSurfer.create({ container: waveformContainer, waveColor: 'rgba(200, 200, 200, 0.5)', progressColor: '#ff6b9d', height: 50, barWidth: 2, barRadius: 3, cursorWidth: 0, responsive: true, hideScrollbar: true, media: audio, }); wavesurfer.on('finish', () => { if (isLetterModeActive) {isLetterModeActive = false; playNextInMix(); } else {}; if (isBirthdayMode) playTrack(birthdayData.song); else playNextInMix(); }); wavesurfer.on('audioprocess', () => { currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime()); }); wavesurfer.on('ready', () => { durationEl.textContent = formatTime(wavesurfer.getDuration()); wavesurfer.play(); }); wavesurfer.on('error', (err) => { console.error(`Lỗi WaveSurfer: ${err}\nKhông thể tải file: ${track.file}`); playNextInMix(); }); wavesurfer.on('play', () => playPauseBtn.textContent = '❚❚'); wavesurfer.on('pause', () => playPauseBtn.textContent = '▶'); } songTitleEl.textContent = track.title; wavesurfer.load(track.file); updateFavoriteButton(track.file); }
    function createDailyMix() { const playlistToShuffle = [...mainPlaylist]; upNextPlaylist = shuffleArray(playlistToShuffle); upNextIndex = 0; }
    function playNextInMix() { if (upNextPlaylist.length === 0) createDailyMix(); if(upNextPlaylist.length > 0) { playTrack(upNextPlaylist[upNextIndex]); upNextIndex = (upNextIndex + 1) % upNextPlaylist.length; } }
    function playPrevInMix() { if (upNextPlaylist.length === 0) return; upNextIndex -= 2; if (upNextIndex < 0) upNextIndex = upNextPlaylist.length + upNextIndex; playTrack(upNextPlaylist[upNextIndex]); upNextIndex = (upNextIndex + 1) % upNextPlaylist.length; }
    function fadeToSpecialTrack(specialTrack) { isLetterModeActive = true; wavesurfer.setVolume(0); playTrack(specialTrack); wavesurfer.setVolume(volumeSlider.value); }
    function getFavorites() { return JSON.parse(localStorage.getItem('favoriteSongs')) || []; }
    function saveFavorites(favorites) { localStorage.setItem('favoriteSongs', JSON.stringify(favorites)); }
    function updateFavoriteButton(file) { const favorites = getFavorites(); if (favorites.includes(file)) { favoriteBtn.classList.add('favorited'); } else { favoriteBtn.classList.remove('favorited'); } }
    
    // --- LOGIC THƯ, MẬT MÃ, SINH NHẬT ---
    function runBirthdayCheck() { const now = new Date(); if (now.getDate() === birthdayData.day && now.getMonth() + 1 === birthdayData.month) { isBirthdayMode = true; return true; } return false; }
    function activateBirthdayMode() { document.getElementById('special-day-btn').classList.add('hidden'); triggerConfetti(); const celebrationOverlay = document.getElementById('birthday-celebration'); setTimeout(() => { celebrationOverlay.classList.remove('hidden'); celebrationOverlay.style.opacity = '1'; }, 1000); setTimeout(() => { celebrationOverlay.style.opacity = '0'; setTimeout(() => celebrationOverlay.classList.add('hidden'), 1000); }, 5000); const btn = document.getElementById('special-day-btn'); btn.classList.remove('hidden'); btn.addEventListener('click', () => openLetter(birthdayData.letter, birthdayData.song, true)); }
    
    function checkAndSetupLetterButton() {
        const btn = document.getElementById('special-day-btn');
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDate();
        const daytimeLetterData = daytimeLetters.find(l => l.day === day);
        if (daytimeLetterData && hour >= 0 && hour < 22) {
            btn.classList.remove('hidden');
            btn.addEventListener('click', () => openLetter(daytimeLetterData, null));
            return;
        }
        const dailyLetterData = dailyLetters.find(l => l.day === day);
        const dailySongData = dailySongs.find(s => s.day === day);
        if (dailyLetterData && dailySongData && hour >= 19) {
            btn.classList.remove('hidden');
            btn.addEventListener('click', () => openLetter(dailyLetterData, dailySongData.song));
        }
    }

    function openLetter(letterData, specialSong = null, isBirthday = false) {
        const letterContainer = document.getElementById('letter-container');
        if (!letterContainer.classList.contains('hidden')) return;
        const letterContentDiv = document.querySelector('.letter-content');
        letterContentDiv.innerHTML = '';
        const titleEl = document.createElement('h1');
        const signatureEl = document.createElement('p');
        signatureEl.className = 'signature';
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-letter-btn';
        closeBtn.innerHTML = '×';
        letterContentDiv.appendChild(closeBtn);
        letterContentDiv.appendChild(titleEl);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = letterData.content;
        const pElements = Array.from(tempDiv.querySelectorAll('p'));
        pElements.forEach(p => letterContentDiv.appendChild(p));
        letterContentDiv.appendChild(signatureEl);
        const signatureText = isBirthday ? 'Yêu cậu nhất luôn,<br>tun' : (specialSong ? 'Yêu cậu rất nhiều,<br>tun' : 'Luôn bên cạnh cậu,<br>tun');
        const elementsToType = [ { element: titleEl, text: letterData.title } ];
        pElements.forEach(p => { elementsToType.push({ element: p, text: p.innerHTML }) });
        elementsToType.push({ element: signatureEl, text: signatureText });
        letterContainer.classList.remove('hidden');
        typewriterEffect(elementsToType);
        if (specialSong && !isBirthday) { fadeToSpecialTrack(specialSong); }
        closeBtn.addEventListener('click', () => {
            letterContainer.classList.add('hidden');
            if (typingInterval) clearTimeout(typingInterval);
            if (specialSong && !isBirthday) { isLetterModeActive = false; playNextInMix(); }
        }, { once: true });
    }

    function triggerSecretEffect() { const count = 50; const centerX = window.innerWidth / 2; const centerY = window.innerHeight / 2; for (let i = 0; i < count; i++) { const p = document.createElement('div'); p.className = 'text-particle heart'; p.textContent = getRandomItem(["💖", "♥", "💕"]); p.style.position = 'fixed'; p.style.left = `${centerX}px`; p.style.top = `${centerY}px`; p.style.zIndex = '9999'; document.body.appendChild(p); const angle = Math.random() * Math.PI * 2; const radius = Math.random() * 300 + 100; const finalX = Math.cos(angle) * radius; const finalY = Math.sin(angle) * radius; const duration = Math.random() * 1000 + 800; const anim = p.animate([{ transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 }, { transform: `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) scale(1)`, opacity: 0 }], { duration: duration, easing: 'ease-out' }); anim.onfinish = () => p.remove(); } }
    
    // --- THIẾT LẬP CÁC SỰ KIỆN ---
    function setupEventListeners() {
        document.addEventListener('click', e => { if (e.target.closest('button, #letter-container, #waveform-controls, #settings-panel, .shooting-star')) return; createStarburst(e.clientX, e.clientY); });
        document.addEventListener('mousedown', e => { if (e.target.closest('button, #letter-container, #waveform-controls, #settings-panel')) return; isDragging = true; lastMouseX = e.clientX; lastMouseY = e.clientY; });
        document.addEventListener('mousemove', e => handleDragMove(e.clientX, e.clientY));
        document.addEventListener('touchstart', e => { if (e.target.closest('button, #letter-container, #waveform-controls, #settings-panel')) return; if (e.touches.length === 1) { isDragging = true; lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY; } }, { passive: true });
        document.addEventListener('touchmove', e => { if (e.touches.length === 1) handleDragMove(e.touches[0].clientX, e.touches[0].clientY); });
        
        const endDrag = () => { if (!isDragging) return; isDragging = false; if (initialOrientation) { initialOrientation.beta = lastKnownOrientation.beta - (rotationX / GYRO_SENSITIVITY); initialOrientation.gamma = lastKnownOrientation.gamma - (rotationY / GYRO_SENSITIVITY); } };
        document.addEventListener('mouseup', endDrag); document.addEventListener('mouseleave', endDrag); document.addEventListener('touchend', endDrag);

        nextBtn.addEventListener('click', playNextInMix); 
        prevBtn.addEventListener('click', playPrevInMix);
        playPauseBtn.addEventListener('click', () => { if (wavesurfer) wavesurfer.playPause(); });
        
        favoriteBtn.addEventListener('click', () => { let favorites = getFavorites(); const currentUrl = wavesurfer.getMediaElement().src; const currentFile = `https://treuah.netlify.app/${decodeURIComponent(currentUrl.split('/').pop())}`; if (favorites.includes(currentFile)) { favorites = favorites.filter(song => song !== currentFile); } else { favorites.push(currentFile); } saveFavorites(favorites); updateFavoriteButton(currentFile); });
        
        const startAudio = () => { if (!wavesurfer) { if (isBirthdayMode) { playTrack(birthdayData.song); } else { createDailyMix(); playNextInMix(); } overlay.style.display = 'none'; waveformControls.classList.remove('hidden'); settingsToggleBtn.classList.remove('hidden'); adjustLetterButtonPosition(); if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') { DeviceOrientationEvent.requestPermission().then(permissionState => { if (permissionState === 'granted') window.addEventListener('deviceorientation', handleOrientation); }).catch(console.error); } } };
        overlay.addEventListener('click', startAudio, { once: true });
        overlay.addEventListener('touchend', startAudio, { once: true });
        
        window.addEventListener('resize', handleResize);
        if ('DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') { window.addEventListener('deviceorientation', handleOrientation); }

        let longPressTimer, isHolding = false; const LONG_PRESS_DURATION = 2000;
        const startHold = (e) => { if (e.target.closest('button, #letter-container')) return; isHolding = true; longPressTimer = setTimeout(() => { if (isHolding) triggerSecretEffect(); }, LONG_PRESS_DURATION); };
        const endHold = () => { isHolding = false; clearTimeout(longPressTimer); };
        document.addEventListener('mousedown', startHold); document.addEventListener('touchstart', startHold, { passive: true });
        document.addEventListener('mouseup', endHold); document.addEventListener('mouseleave', endHold); document.addEventListener('touchend', endHold);

        settingsToggleBtn.addEventListener('click', () => settingsPanel.classList.toggle('hidden'));
        volumeSlider.addEventListener('input', e => { if(wavesurfer) wavesurfer.setVolume(e.target.value); });
        gyroToggle.addEventListener('change', e => { gyroEnabled = e.target.checked; if (!gyroEnabled) initialOrientation = null; });
    }
    
    // --- VÒNG LẶP CHÍNH VÀ KHỞI TẠO ---
    let lastParticleTime = 0;
    function mainLoop(timestamp) { if (timestamp - lastParticleTime > config.particleInterval) { createTextParticle(); lastParticleTime = timestamp; } requestAnimationFrame(mainLoop); }
    function adjustLetterButtonPosition() {
        const btn = document.getElementById('special-day-btn');
        const waveformControls = document.getElementById('waveform-controls');
        if (btn && waveformControls) {
            const playerHeight = waveformControls.offsetHeight; // Lấy chiều cao thực tế của khung nhạc
            const bottomMargin = parseInt(window.getComputedStyle(waveformControls).marginBottom) || 15; // Lấy khoảng cách dưới của khung nhạc
            const desiredGap = 20; // Khoảng trống mong muốn phía trên khung nhạc
            
            btn.style.bottom = `${playerHeight + bottomMargin + desiredGap}px`;
        }
    }

    function init() {
        updateSkyColor(); setInterval(updateSkyColor, 60000);
        
        setupResponsiveValues();
        setupEventListeners(); 
        createStars();
        
        if (runBirthdayCheck()) {
            activateBirthdayMode();
        } else {
            checkAndSetupLetterButton();
        }
        
        setTimeout(() => { setInterval(createShootingStar, 1500); }, 3000);
        requestAnimationFrame(mainLoop);

        setTimeout(() => { loadingScreen.classList.add('loaded'); }, 2000);
    }
    
    init();
})
