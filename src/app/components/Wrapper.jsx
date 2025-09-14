const Wrapper = ({ children }) => {
    return <div className="filter drop-shadow-xl">
        {/* pas bsoin dfaire grand chose pr mobile c deja bien centre */}
        <div className="w-[340px] bg-gray-900 text-white rounded-2xl p-4 shadow-lg">
            {children}
        </div>
    </div>
}

export default Wrapper;