import { useState } from 'react';
import { ArrowLeft, BedDouble, Users } from 'lucide-react';
import BookingModal from './BookingModal';

const rooms = [
  {
    name: 'Standard',
    image: '/images/accommodation1.png',
    description:
      'A quiet glamping unit for guests seeking a simple, restorative stay close to the mangrove landscape.',
    price: 'From 2,300,000 VND / night',
    capacity: '2 guests',
  },
  {
    name: 'Deluxe',
    image: '/images/accommodation2.png',
    description:
      'A more spacious retreat with added comfort, natural textures, and a private setting for slower mornings and deeper rest.',
    price: 'From 2,800,000 VND / night',
    capacity: '2 guests',
  },
  {
    name: 'Suite',
    image: '/images/accommodation3.png',
    description:
      'An elevated stay designed for longer pauses, with generous interior space and a stronger sense of privacy.',
    price: 'From 3,200,000 VND / night',
    capacity: '2 guests',
  },
  {
    name: 'Family Suite',
    image: '/images/accommodation4.png',
    description:
      'A larger unit for families or small groups who want to share the mangrove experience without losing comfort.',
    price: 'From 6,500,000 VND / night',
    capacity: '4 guests',
  },
];

export default function RoomsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Standard');

  const openModal = (roomName) => {
    setSelectedRoom(roomName);
    setModalOpen(true);
  };

  return (
    <>
    <div className="min-h-screen bg-linen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-forest text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt=""
            className="w-full h-full object-cover opacity-35"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charred/70 via-forest/80 to-forest" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white/70 hover:text-amber transition-colors duration-300 text-sm tracking-widest uppercase mb-10"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retreat Home
          </a>
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Book Your Stay</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl">
            Choose Your <span className="italic font-normal">Room</span>
          </h1>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            Four low-density glamping options shaped for privacy, restoration, and meaningful time in the mangrove environment.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-8">
            {rooms.map((room) => (
              <article
                key={room.name}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] overflow-hidden rounded-2xl bg-cream border border-charred/8 shadow-[0_18px_50px_rgba(59,51,44,0.08)]"
              >
                <div className="relative min-h-72 lg:min-h-[360px]">
                  <img
                    src={room.image}
                    alt={`${room.name} glamping room`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charred/30 to-transparent lg:bg-gradient-to-r" />
                </div>

                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/8 text-forest text-xs tracking-widest uppercase">
                      <BedDouble size={14} strokeWidth={1.5} />
                      Glamping Unit
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/15 text-charred text-xs tracking-widest uppercase">
                      <Users size={14} strokeWidth={1.5} />
                      {room.capacity}
                    </span>
                  </div>

                  <h3 className="font-heading text-charred text-3xl md:text-4xl mb-4">
                    {room.name}
                  </h3>
                  <p className="text-charred-light leading-relaxed max-w-2xl mb-8">
                    {room.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-6 border-t border-charred/10">
                    <p className="font-heading text-forest text-2xl md:text-3xl">
                      {room.price}
                    </p>
                    <button
                      onClick={() => openModal(room.name)}
                      className="inline-flex items-center justify-center px-6 py-3 bg-forest text-linen text-sm tracking-widest uppercase rounded-full hover:bg-forest-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
    <BookingModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      preselectedRoom={selectedRoom}
    />
    </>
  );
}
