import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { GiChatBubble } from "react-icons/gi";
import { IoChatboxOutline, IoCloseCircle } from "react-icons/io5";
import moment from "moment";
import Layout from "@/Layouts/Layout";
import Chat from "@/Components/Chat";
import TruncateText from "@/Components/TruncateText";

function Pesan() {
    // untuk komponen chat
    const [chatChannel, setChatChannel] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [tanggal, setTanggal] = useState("");

    function delay() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async function synchronousDelayShowChat() {
        setShowChat(false);
        await delay();
        setShowChat(true);
    }

    // untuk isi properti komponen chat
    const [recipientId, setRecipientId] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhoto, setRecipientPhoto] = useState("");
    const { auth } = usePage().props;

    const [pesanGroupBelumDibaca, setPesanGroupBelumDibaca] = useState([]);

    const [pesanGroupDibaca, setPesanGroupDibaca] = useState([]);

    async function getUnreadMessage() {
        try {
            const response = await axios.get("/api/chat/unread-conversations");
            setPesanGroupBelumDibaca(Object.values(response.data.pesan_group));
        } catch (error) {
            console.info(error);
        }
    }

    async function getReadMessage() {
        try {
            const response = await axios.get("/api/chat/read-conversations");
            setPesanGroupDibaca(Object.values(response.data.pesan_group));
        } catch (error) {
            console.info(error);
        }
    }

    useEffect(() => {
        getUnreadMessage();
        getReadMessage();
    }, [recipientId]);

    return (
        <div className="p-4 text-gray-800 body-pesan">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">Pesan</h1>
            </div>
            <h2
                className={`text-gray-50 text-center border-b border-1 border-white mb-4 ${
                    pesanGroupBelumDibaca.length > 0 ? "" : "hidden"
                }`}
            >
                Pesan belum dibaca
            </h2>
            <ul>
                {Array.isArray(pesanGroupBelumDibaca) &&
                pesanGroupBelumDibaca.length > 0
                    ? pesanGroupBelumDibaca.map((pesan, index) => (
                          <div
                              key={index}
                              onClick={() => {
                                  synchronousDelayShowChat();
                                  setShowLoading(true);
                                  axios
                                      .put(
                                          `/api/chat/mark-as-read/${pesan[0].chat_channel}`
                                      )
                                      .then((response) => {
                                          setShowLoading(false);
                                          setChatChannel(pesan[0].chat_channel);
                                          setRecipientId(pesan[0].sender.id);
                                          setRecipientName(
                                              pesan[0].sender.nama
                                          );
                                          setRecipientPhoto(
                                              pesan[0].sender.url_foto
                                          );
                                      })
                                      .catch((error) => {
                                          console.info(error);
                                      });
                              }}
                          >
                              <div className="text-gray-50">
                                  Channel :{" "}
                                  <span className="bg-yellow-400 text-gray-800 px-1">
                                      {pesan[0].chat_channel}
                                  </span>
                              </div>
                              <div className="flex justify-between md:w-[500px] items-center bg-gray-100 hover:bg-gray-200 shadow px-2 py-1 rounded cursor-pointer select-none">
                                  <div className="flex items-center">
                                      <img
                                          src={pesan[0].sender.url_foto}
                                          alt="sender photo"
                                          className="w-10 h-10 rounded-full border border-gray-300 mr-2 object-cover object-center"
                                      />
                                      <div>
                                          <p className="font-extrabold text-[0.8em] sm:text-base">
                                              {pesan[0].sender.nama}
                                          </p>
                                          <span className="text-slate-500 text-sm sm:text-base sm:hidden">
                                              <TruncateText
                                                  text={pesan[0].message}
                                                  limit={15}
                                              />
                                          </span>
                                          <span className="text-slate-500 text-sm sm:text-base hidden sm:inline-block overflow-hidden">
                                              <TruncateText
                                                  text={pesan[0].message}
                                                  limit={50}
                                              />
                                          </span>
                                      </div>
                                  </div>
                                  <div>
                                      <span className="text-[0.7em] mr-1 pl-2">
                                          {moment(pesan[0].created_at).format(
                                              "HH:m"
                                          )}
                                      </span>
                                      {pesan.length > 0 && (
                                          <div className="ml-3 font-bold bg-sky-500 text-sm w-5 h-5 text-center text-white rounded-full">
                                              {pesan.length}
                                          </div>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))
                    : ""}
            </ul>
            <h2
                className={`text-gray-50 text-center border-b border-1 border-white mb-4 mt-8 ${
                    pesanGroupDibaca.length > 0 ? "" : "hidden"
                }`}
            >
                Pesan dibaca
            </h2>
            <ul>
                {Array.isArray(pesanGroupDibaca) && pesanGroupDibaca.length > 0
                    ? pesanGroupDibaca.map((pesan, index) => (
                          <div
                              key={index}
                              onClick={(e) => {
                                  e.preventDefault();
                                  synchronousDelayShowChat();
                                  setShowLoading(true);
                                  axios
                                      .put(
                                          `/api/chat/mark-as-read/${pesan[0].chat_channel}`
                                      )
                                      .then((response) => {
                                          setShowLoading(false);
                                          setChatChannel(pesan[0].chat_channel);
                                          setTanggal(pesan[0].tanggal);
                                          setRecipientId(pesan[0].sender.id);
                                          setRecipientName(
                                              pesan[0].sender.nama
                                          );
                                          setRecipientPhoto(
                                              pesan[0].sender.url_foto
                                          );
                                      })
                                      .catch((error) => {
                                          console.info(error);
                                      });
                              }}
                          >
                              <div className="text-gray-50">
                                  Channel :{" "}
                                  <span className="bg-yellow-400 text-gray-800 px-1">
                                      {pesan[0].chat_channel}
                                  </span>
                              </div>
                              <div className="flex justify-between md:w-[500px] items-center bg-gray-100 hover:bg-gray-200 shadow px-2 py-1 rounded cursor-pointer select-none">
                                  <div className="flex items-center">
                                      <img
                                          src={pesan[0].sender.url_foto}
                                          alt="sender photo"
                                          className="w-10 h-10 rounded-full border border-gray-300 mr-2 object-cover object-center"
                                      />
                                      <div>
                                          <p className="font-extrabold text-[0.8em] sm:text-base">
                                              {pesan[0].sender.nama}
                                          </p>
                                          <span className="text-slate-500 text-sm sm:text-base sm:hidden">
                                              <TruncateText
                                                  text={pesan[0].message}
                                                  limit={15}
                                              />
                                          </span>
                                          <span className="text-slate-500 text-sm sm:text-base hidden sm:inline-block overflow-hidden">
                                              <TruncateText
                                                  text={pesan[0].message}
                                                  limit={50}
                                              />
                                          </span>
                                      </div>
                                  </div>
                                  <div>
                                      <span className="text-[0.7em] mr-1">
                                          {moment(pesan[0].created_at).format(
                                              "HH:m"
                                          )}
                                      </span>
                                      {/* {pesan.length > 0 && (
                                        <div className="ml-1 font-bold bg-gray-300 text-sm w-5 h-5 text-center text-white rounded-full">
                                            {pesan.length}
                                        </div>
                                    )} */}
                                  </div>
                              </div>
                          </div>
                      ))
                    : ""}
            </ul>
            {showChat && (
                <Draggable handle=".drag">
                    <div
                        className={`block drag fixed border-r  bottom-16 sm:bottom-5 right-8 border border-slate-50 rounded-md bg-opacity-20 cursor-move select-none`}
                        style={{
                            backgroundImage: `url(${
                                import.meta.env.VITE_APP_URL
                            }/assets/background/bg-chat-3-min.jpg)`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "contain",
                        }}
                    >
                        <Chat
                            chatChannel={chatChannel}
                            tanggal={tanggal}
                            senderId={auth.user.id}
                            recipientId={recipientId}
                            senderPhoto={auth.user.url_foto}
                            recipientPhoto={recipientPhoto}
                            senderName={auth.user.nama}
                            recipientName={recipientName}
                        />

                        <button
                            className="fixed -top-3 -right-3 z-50"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowChat(false);
                            }}
                        >
                            <IoCloseCircle
                                size="2em"
                                className="fill-gray-800 bg-gray-50 rounded-full p-0"
                            />
                        </button>
                        <div
                            className={`absolute z-20 top-0 bottom-0 left-0 right-0 bg-gray-800 text-gray-50 ${
                                showLoading ? "flex" : "hidden"
                            } justify-center items-center`}
                        >
                            <span>Loading...</span>
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    );
}

export default Pesan;

Pesan.layout = (page) => <Layout children={page} title="Pesan" />;
