import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import banner1 from "../../assets/slider/banner/banner_ph_2.png";
import banner2 from "../../assets/slider/banner/banner_ph_3.png";
import banner3 from "../../assets/slider/banner/banner_ph_4.png";
import banner4 from "../../assets/slider/banner/banner_ph_5.png";


const data = [
  {
    id: 1,
    img: banner1,
    title: "Đại diện Công ty Vận tải Phú Minh",
    content:
      "Chúng tôi đặt in decal đồng bộ cho đội xe công ty. Sản phẩm rất chuyên nghiệp, keo dán bám tốt, không phai màu dưới mưa nắng. Dịch vụ nhanh gọn, đúng tiến độ",
  },
  {
    id: 2,
    img: banner2,
    title: "Trần Ngọc Huy",
    content:
      "Mình cực kỳ hài lòng với chất lượng decal! Màu in rõ nét, dán lên xe không bị bong tróc, lại còn được tư vấn tận tình. Lần sau chắc chắn sẽ ủng hộ tiếp!",
  },
  {
    id: 3,
    img: banner3,
    title: "Trọng Đức",
    content:
      "Tem dán thiết kế riêng đúng chuẩn gu cá nhân! Màu sắc lên cực chuẩn, dán vừa khít không bị nhăn. Đi tour mưa nắng vẫn không tróc – quá hài lòng!",
  },
  {
    id: 4,
    img: banner4,
    title: "Nguyễn Minh Tâm",
    content:
      "Mình đặt decal dán xe theo mẫu hình mình tự chọn, lên màu rất chuẩn. Shop hỗ trợ chỉnh ảnh kỹ, chọn chất liệu phù hợp nữa. Rất hài lòng!",
  },
];

const FeedbackSlider = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }} 

      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-black text-white p-4 rounded-lg">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover rounded-lg"
              />
              <h3 className="font-bold text-lg mt-2 border-t-2 border-white pt-2">
                {item.title}
              </h3>
              <p className="text-sm">{item.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
