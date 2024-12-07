import "./ChuyenNha.css";

function ChuyenNha() {
  return (
    <div>
      {/* Phần "Chuyện Nhà" */}
      <div className="chuyen-nha-container">
        <h2 className="chuyen-nha-title">Chuyện Nhà</h2>
        <div className="chuyen-nha-underline"></div>
        <p className="chuyen-nha-text">
          TPQT Coffee sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị kết nối con người và sẻ chia thân tình bên những tách cà phê, ly trà đượm hương, truyền cảm hứng về lối sống hiện đại.
        </p>
      </div>

      <div className="news-container">
        {/* Card đầu tiên */}
        <div className="news-card">
          <img src="https://file.hstatic.net/1000075078/article/thecoffeehouse_traxanhtaybac_1_d8c2ac635c5941a19c0065339727e41a_master.jpg" alt="Tây Bắc" />
          <div className="news-content">
            <h1>NGƯỢC LÊN TÂY BẮC GÓI VỊ MỘC VỀ XUÔI</h1>
            <p>16/08/2023</p>
            <p>
              Những dải ruộng bậc thang, các cô gái Thái với điệu múa xòe hoa,
              muôn cung đường ngập mùa hoa... đó là rẻo cao Tây Bắc luôn làm say
              lòng...
            </p>
          </div>
        </div>

        {/* Card thứ hai */}
        <div className="news-card">
          <img src="https://file.hstatic.net/1000075078/article/signaturebythecoffeehouse_03_16b2ab7101e14d62835a4b231e73b65d_master.jpg" alt="Coffee House" />
          <div className="news-content">
            <h1>TPQT Coffee - "DẤU ẤN" MỚI CỦA NHÀ CÀ PHÊ</h1>
            <p>16/08/2023</p>
            <p>
              Một không gian hiện đại, hòa quyện giữa thiên nhiên và nét tối giản,
              mang đến trải nghiệm cà phê độc đáo và đầy cảm xúc.
            </p>
          </div>
        </div>
      </div> {/* Đóng thẻ news-container */}

      {/* Thẻ chứa tiêu đề Coffeeholic */}
      <div className="coffeeholic-container">
        <div className="coffeeholic-line"></div>
        <div className="coffeeholic-title">
          <h3>Coffeeholic</h3>
        </div>
      </div>

      {/* Card với hình ảnh và thông tin về Coffeeholic */}
      <div className="coffeeholic-card">
        <div className="coffeeholic-image">
          <img src="https://file.hstatic.net/1000075078/article/thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_master.jpg" alt="Coffeeholic" />
        </div>
        <div className="coffeeholic-text">
          <h3>BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ</h3>
          <p>11/01/2023</p>
          <p>
            Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại...
          </p>
        </div>
      </div>

      <div className="coffeeholic-card">
        <div className="coffeeholic-image">
          <img src="https://file.hstatic.net/1000075078/article/1200x630_0b0081d93ba6479b934e04e71cbfd102_master.jpg" alt="Coffeeholic" />
        </div>
        <div className="coffeeholic-text">
          <h3>CHỈ CHỌN CÀ PHÊ MỖI SÁNG NHƯNG CŨNG KHIẾN CUỘC SỐNG CỦA BẠN THÊM THÚ VỊ, TẠI SAO KHÔNG?</h3>
          <p>30/10/2023</p>
          <p>
            Thực chất, bạn không nhất thiết phải làm gì to tát để tạo nên một ngày rực rỡ...
          </p>
        </div>
      </div>

      <div className="coffeeholic-card">
        <div className="coffeeholic-image">
          <img src="https://file.hstatic.net/1000075078/article/3__1__2b67342f4db64bb082944cf078afd910_master.jpg" alt="Coffeeholic" />
        </div>
        <div className="coffeeholic-text">
          <h3>SIGNATURE - BIỂU TƯỢNG VĂN HOÁ CÀ PHÊ CỦA TPQT Coffee ĐÃ QUAY TRỞ LẠI</h3>
          <p>12/12/2023</p>
          <p>
            Mới đây, các "tín đồ" cà phê đang bàn tán xôn xao về SIGNATURE - Biểu ....
          </p>
        </div>
      </div>

      {/* Thẻ chứa tiêu đề Teaholic */}
      <div className="teaholic-container">
        <div className="teaholic-line"></div>
        <div className="teaholic-title">
          <h3>Teaholic</h3>
        </div>
      </div>
      
        <div className="teaholic-cards">
        <div className="teaholic-card">
          <div className="teaholic-image">
            <img src="https://file.hstatic.net/1000075078/article/an_banh_uong_nuoc_nhom_03_d499c0cab14746588fff6fe0dee678ad_master.jpg" alt="Teaholic" />
          </div>
          <div className="teaholic-text">
            <h3>TRUNG THU NÀY, SAO BẠN KHÔNG TỰ CHO MÌNH "DỪNG MỘT CHÚT THÔI, THƯỞNG MỘT CHÚT TRÔI"?</h3>
            <p>21/01/2023</p>
            <p>
              Bạn có từng nghe: “Trung thu thôi mà, có gì đâu mà chơi”, hay “Trung thu càng ngày càng chán”...
            </p>
          </div>
        </div>
        

        <div className="teaholic-card">
          <div className="teaholic-image">
            <img src="https://file.hstatic.net/1000075078/article/cautoankeothom_thecoffeehouse_03_29cd435c9a574e1a867ac36f2c863bb6_master.jpg" alt="Teaholic" />
          </div>
          <div className="teaholic-text">
            <h3>“KHUẤY ĐỂ THẤY TRĂNG" - KHUẤY LÊN NIỀM HẠNH PHÚC: TRẢI NGHIỆM KHÔNG THỂ BỎ LỠ MÙA TRUNG THU NÀY</h3>
            <p>30/10/2023</p>
            <p>
              Năm 2022 là năm đề cao sức khỏe tinh thần nên giới trẻ muốn tận hưởng một Trung thu với nhiều trải nghiệm mới mẻ, rôm rả cùng bạn bè và người thân. Và trải nghiệm độc đáo...
            </p>
          </div>
        </div>

        <div className="teaholic-card">
          <div className="teaholic-image">
            <img src="https://file.hstatic.net/1000075078/article/dscf0216_2890bcca44ae49aaaf843d5fa3db2fc6_master.jpg" alt="Teaholic" />
          </div>
          <div className="teaholic-text">
            <h3>BỘ SƯU TẬP CẦU TOÀN KÈO THƠM: "VÍA" MAY MẮN KHÔNG THỂ BỎ LỠ TẾT NÀY</h3>
            <p>15/08/2023</p>
            <p>
              Để chào đón mùa Tết Trung Thu năm 2023, nhà TPQT Coffee đã chuẩn bị một món quà vô cùng đặc biệt với giá trị yêu thương...
            </p>
          </div>
        </div>
          </div>    
      </div>
    
  );
}

export default ChuyenNha;
