class HotelsController < ApplicationController
  before_action :find_hotel, only: [:edit, :update, :destroy]

  def index
  end

  def list
    @hotels = Hotel.all
  end

  def edit
  end

  def filter
    hotels = Array.new
    Hotel.where(filter: params.require(:filter_str)).all.each do |h|
      hotels.push(h.attributes)
    end
    render :json => hotels
  end

  def update
    hotel_params.each do |name, val|
      @hotel.send("#{name}=",val)
    end

    if @hotel.save
      redirect_to list_path
    else
      render 'edit'
    end
  end

  def new
    @hotel = Hotel.new
    @hotel.name = ""
    @hotel.address = ""
    @hotel.starRating = 0;
    @hotel.accomodationType = ""
    render 'edit'
  end

  def create
    @hotel = Hotel.new
    hotel_params.each do |name, val|
      @hotel.send("#{name}=",val)
    end

    if @hotel.save
      redirect_to list_path
    else
      render 'edit'
    end
  end

  def destroy
    @hotel.destroy
    redirect_to list_path
  end

  private
    def find_hotel
      @hotel = Hotel.find(params[:id])
      @hotel.id = @hotel._id
    end

    def hotel_params
      params.require(:hotel).permit(:name, :address, :accomodationType, :starRating)
    end

end
