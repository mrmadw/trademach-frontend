import react from 'react'



function Footer() {
    return (
    <>
    <footer class="bg-gray-800 text-white py-4 px-3 mt-16">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p class="text-xs text-gray-400 md:text-sm">© 2026 TradeMach | Website powered by KibungDevs
</p>
        </div>
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
                <li class="mx-4"><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Terms of Use</a></li>
            </ul>
        </div>
    </div>
</footer>
    </>
  );
}

export default Footer;
